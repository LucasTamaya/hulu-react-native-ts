import React from "react";
import { act, fireEvent } from "@testing-library/react-native";
import * as Navigation from "@react-navigation/native";
import { rest } from "msw";

import { AppWrapper } from "../../../Mocks/AppWrapper";
import { Register } from "../Register";
import { renderWithClient } from "../../../tests/utils";
import { server } from "../../../Mocks/server";

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

const MockComponent: React.FC = () => {
  return (
    <AppWrapper>
      <Register />
    </AppWrapper>
  );
};

describe("Register Screen", () => {
  it("should renders the component", () => {
    const { getByTestId } = renderWithClient(<MockComponent />);
    expect(getByTestId("register")).toBeTruthy();
  });

  it("should renders 3 inputs", () => {
    const { getByTestId } = renderWithClient(<MockComponent />);
    expect(getByTestId("registerNameInput")).toBeTruthy();
    expect(getByTestId("registerEmailInput")).toBeTruthy();
    expect(getByTestId("registerPwdInput")).toBeTruthy();
  });

  it("should renders a 'Créer mon compte' button", () => {
    const { getByTestId } = renderWithClient(<MockComponent />);
    expect(getByTestId("registerBtn")).toBeTruthy();
  });

  it("should renders 3 error messages if I submit the form with empty inputs", async () => {
    const { getByTestId, queryAllByText } = renderWithClient(<MockComponent />);
    await act(async () => {
      fireEvent.press(getByTestId("registerBtn"));
    });
    expect(queryAllByText("Ce champ est obligatoire")).toHaveLength(3);
  });

  it("should renders 3 error messages if I submit the form with invalid name, email and password", async () => {
    const { getByTestId, queryByText } = renderWithClient(<MockComponent />);
    await act(async () => {
      fireEvent.changeText(getByTestId("registerNameInput"), "j");
      fireEvent.changeText(getByTestId("registerEmailInput"), "john.doe.fr12");
      fireEvent.changeText(getByTestId("registerPwdInput"), "123");
      fireEvent.press(getByTestId("registerBtn"));
    });
    expect(queryByText("Ce nom est invalide")).toBeTruthy();
    expect(queryByText("Cette adresse email est invalide")).toBeTruthy();
    expect(queryByText("Ce mot de passe est trop court")).toBeTruthy();
  });

  it("should not renders error messages if I submit the form with valid name, email and password", async () => {
    const { getByTestId, queryAllByText, queryByText } = renderWithClient(
      <MockComponent />
    );
    await act(async () => {
      fireEvent.changeText(getByTestId("registerNameInput"), "john");
      fireEvent.changeText(
        getByTestId("registerEmailInput"),
        "john.doe@orange.fr"
      );
      fireEvent.changeText(getByTestId("registerPwdInput"), "123456");
      fireEvent.press(getByTestId("registerBtn"));
    });
    expect(queryAllByText("Ce champ est obligatoire")).toHaveLength(0);
    expect(queryByText("Ce nom est invalide")).toBeFalsy();
    expect(queryByText("Cette adresse email est invalide")).toBeFalsy();
    expect(queryByText("Ce mot de passe est trop court")).toBeFalsy();
  });

  it("should renders a button to navigate to the Login Screen", () => {
    const { getByTestId } = renderWithClient(<MockComponent />);
    expect(getByTestId("loginNavBtn")).toBeTruthy();
  });

  it("should navigate to the Login Screen if I click on the corresponding button", async () => {
    const navigationMock = jest.fn();
    jest
      .spyOn(Navigation, "useNavigation")
      .mockReturnValue({ navigate: navigationMock });
    const { getByTestId } = renderWithClient(<MockComponent />);
    await act(async () => {
      fireEvent.press(getByTestId("loginNavBtn"));
    });
    expect(navigationMock).toHaveBeenCalledTimes(1);
    expect(navigationMock).toHaveBeenCalledWith("Login");
  });

  it("should navigate to the UserLogged Screen if the user is authenticated", async () => {
    const navigationMock = jest.fn();
    jest
      .spyOn(Navigation, "useNavigation")
      .mockReturnValue({ navigate: navigationMock });

    const { getByTestId, findByText } = renderWithClient(<MockComponent />);

    await act(async () => {
      fireEvent.changeText(getByTestId("registerNameInput"), "john");
      fireEvent.changeText(
        getByTestId("registerEmailInput"),
        "john.doe@orange.fr"
      );
      fireEvent.changeText(getByTestId("registerPwdInput"), "123456");
      fireEvent.press(getByTestId("registerBtn"));
    });

    expect(navigationMock).toHaveBeenCalledTimes(1);
    expect(navigationMock).toHaveBeenCalledWith("UserLogged");
    expect(await findByText("Compte crée avec succès")).toBeTruthy();
  });

  it("should stays on the Register Screen and shows an error message if the user is not authenticated", async () => {
    // simule l'utilisateur non authentifié au niveau de la réponse de l'api avec MSW
    server.use(
      rest.post("*", (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            error: true,
            details: "Utilisateur déjà existant",
          })
        );
      })
    );

    const { getByTestId, findByText } = renderWithClient(<MockComponent />);

    await act(async () => {
      fireEvent.changeText(getByTestId("registerNameInput"), "john");
      fireEvent.changeText(
        getByTestId("registerEmailInput"),
        "john.doe@orange.fr"
      );
      fireEvent.changeText(getByTestId("registerPwdInput"), "123456");
      fireEvent.press(getByTestId("registerBtn"));
    });

    expect(await findByText("Utilisateur déjà existant")).toBeTruthy();
  });

  it("should stays on the Register Screen and shows an error message if the fetch request fails", async () => {
    // simule l'utilisateur non authentifié au niveau de la réponse de l'api avec MSW
    server.use(
      rest.post("*", (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    const { getByTestId, findByText } = renderWithClient(<MockComponent />);

    await act(async () => {
      fireEvent.changeText(getByTestId("registerNameInput"), "john");
      fireEvent.changeText(
        getByTestId("registerEmailInput"),
        "john.doe@orange.fr"
      );
      fireEvent.changeText(getByTestId("registerPwdInput"), "123456");
      fireEvent.press(getByTestId("registerBtn"));
    });

    expect(await findByText("Erreur du serveur interne")).toBeTruthy();
  });
});
