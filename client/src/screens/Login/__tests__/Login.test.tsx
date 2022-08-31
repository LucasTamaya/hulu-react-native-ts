import React from "react";
import { act, fireEvent } from "@testing-library/react-native";
import * as Navigation from "@react-navigation/native";

import { Login } from "../Login";
import { AppWrapper } from "../../../tests/AppWrapper";
import { renderWithClient } from "../../../tests/utils";
import { server } from "../../../tests/server";
import { rest } from "msw";

jest.useFakeTimers();

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

const MockComponent: React.FC = () => {
  return (
    <AppWrapper>
      <Login />
    </AppWrapper>
  );
};

describe("Login Screen", () => {
  it("should renders the component", () => {
    const { getByTestId } = renderWithClient(<MockComponent />);
    expect(getByTestId("login")).toBeTruthy();
  });

  it("should renders 2 inputs", () => {
    const { getByTestId } = renderWithClient(<MockComponent />);
    expect(getByTestId("loginEmailInput")).toBeTruthy();
    expect(getByTestId("loginPwdInput")).toBeTruthy();
  });

  it("should renders a 'Connexion' button", () => {
    const { getByTestId } = renderWithClient(<MockComponent />);
    expect(getByTestId("loginBtn")).toBeTruthy();
  });

  it("should renders 2 error messages if I submit the form with empty inputs", async () => {
    const { getByTestId, queryAllByText } = renderWithClient(<MockComponent />);
    await act(async () => {
      fireEvent.press(getByTestId("loginBtn"));
    });
    expect(queryAllByText("Ce champ est obligatoire")).toHaveLength(2);
  });

  it("should renders 2 error messages if I submit the form with invalid email and password", async () => {
    const { getByTestId, queryByText } = renderWithClient(<MockComponent />);
    await act(async () => {
      fireEvent.changeText(getByTestId("loginEmailInput"), "john.doe.fr12");
      fireEvent.changeText(getByTestId("loginPwdInput"), "123");
      fireEvent.press(getByTestId("loginBtn"));
    });
    expect(queryByText("Cette adresse email est invalide")).toBeTruthy();
    expect(queryByText("Ce mot de passe est trop court")).toBeTruthy();
  });

  it("should not renders error messages if I submit the form with valid email and password", async () => {
    const { getByTestId, queryAllByText, queryByText } = renderWithClient(
      <MockComponent />
    );
    await act(async () => {
      fireEvent.changeText(
        getByTestId("loginEmailInput"),
        "john.doe@orange.fr"
      );
      fireEvent.changeText(getByTestId("loginPwdInput"), "123456");
      fireEvent.press(getByTestId("loginBtn"));
    });
    expect(queryAllByText("Ce champ est obligatoire")).toHaveLength(0);
    expect(queryByText("Cette adresse email est invalide")).toBeFalsy();
    expect(queryByText("Ce mot de passe est trop court")).toBeFalsy();
  });

  it("should renders a button to navigate to the Register Screen", () => {
    const { getByTestId } = renderWithClient(<MockComponent />);
    expect(getByTestId("registerNavBtn")).toBeTruthy();
  });

  it("should navigate to the Register Screen if I click on the corresponding button", async () => {
    const navigationMock = jest.fn();
    jest
      .spyOn(Navigation, "useNavigation")
      .mockReturnValue({ navigate: navigationMock });
    const { getByTestId } = renderWithClient(<MockComponent />);
    await act(async () => {
      fireEvent.press(getByTestId("registerNavBtn"));
    });
    expect(navigationMock).toHaveBeenCalledTimes(1);
    expect(navigationMock).toHaveBeenCalledWith("Register");
  });

  it("should navigate to the UserLogged Screen if the user is authenticated", async () => {
    const navigationMock = jest.fn();
    jest
      .spyOn(Navigation, "useNavigation")
      .mockReturnValue({ navigate: navigationMock });

    jest.spyOn(global, "setTimeout");

    const { getByTestId, findByText } = renderWithClient(<MockComponent />);

    await act(async () => {
      fireEvent.changeText(
        getByTestId("loginEmailInput"),
        "john.doe@orange.fr"
      );
      fireEvent.changeText(getByTestId("loginPwdInput"), "123456");
      fireEvent.press(getByTestId("loginBtn"));
    });

    jest.runAllTimers();

    expect(navigationMock).toHaveBeenCalledTimes(1);
    expect(navigationMock).toHaveBeenCalledWith("UserLogged");
    expect(await findByText("Connexion réussie")).toBeTruthy();
  });

  it("should stays on the Login Screen and shows an error message if the user is not authenticated", async () => {
    // simule l'utilisateur non authentifié au niveau de la réponse de l'api avec MSW
    server.use(
      rest.post("*", (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            error: true,
            details: "Email ou mot de passe invalide",
          })
        );
      })
    );

    const { getByTestId, findByText } = renderWithClient(<MockComponent />);

    await act(async () => {
      fireEvent.changeText(
        getByTestId("loginEmailInput"),
        "john.doe@orange.fr"
      );
      fireEvent.changeText(getByTestId("loginPwdInput"), "wrongPassword");
      fireEvent.press(getByTestId("loginBtn"));
    });

    expect(await findByText("Email ou mot de passe invalide")).toBeTruthy();
  });

  it("should stays on the Login Screen and shows an error message if the fetch request fails", async () => {
    // simule l'utilisateur non authentifié au niveau de la réponse de l'api avec MSW
    server.use(
      rest.post("*", (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    const { getByTestId, findByText } = renderWithClient(<MockComponent />);

    await act(async () => {
      fireEvent.changeText(
        getByTestId("loginEmailInput"),
        "john.doe@orange.fr"
      );
      fireEvent.changeText(getByTestId("loginPwdInput"), "123abcd");
      fireEvent.press(getByTestId("loginBtn"));
    });

    expect(await findByText("Erreur du serveur interne")).toBeTruthy();
  });
});
