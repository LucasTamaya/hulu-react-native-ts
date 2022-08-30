import React from "react";
import { act, fireEvent, render } from "@testing-library/react-native";
import * as Navigation from "@react-navigation/native";

import { Login } from "../Login";
import { AppWrapper } from "../../../Mocks/AppWrapper";
import { renderWithClient } from "../../../tests/utils";
import { server } from "../../../Mocks/server";
import { rest } from "msw";

jest.mock("@react-navigation/native", () => {
  return {
    __esModule: true,
    ...jest.requireActual("@react-navigation/native"),
  };
});

const MockComponent: React.FC = () => {
  return (
    <AppWrapper>
      <Login />
    </AppWrapper>
  );
};

describe("Login Screen", () => {
  it("should renders the component", () => {
    const { getByTestId } = render(<MockComponent />);
    expect(getByTestId("login")).toBeTruthy();
  });

  it("should renders 2 inputs", () => {
    const { getByTestId } = render(<MockComponent />);
    expect(getByTestId("loginEmailInput")).toBeTruthy();
    expect(getByTestId("loginPasswordInput")).toBeTruthy();
  });

  it("should renders a 'Connexion' button", () => {
    const { getByTestId } = render(<MockComponent />);
    expect(getByTestId("loginBtn")).toBeTruthy();
  });

  it("should renders 2 error messages if I submit the form with empty inputs", async () => {
    const { getByTestId, queryAllByText } = render(<MockComponent />);
    await act(async () => {
      fireEvent.press(getByTestId("loginBtn"));
    });
    expect(queryAllByText("Ce champ est obligatoire")).toHaveLength(2);
  });

  it("should renders 2 error messages if I submit the form with invalid email and password", async () => {
    const { getByTestId, queryByText } = render(<MockComponent />);
    await act(async () => {
      fireEvent.changeText(getByTestId("loginEmailInput"), "john.doe.fr12");
      fireEvent.changeText(getByTestId("loginPasswordInput"), "123");
      fireEvent.press(getByTestId("loginBtn"));
    });
    expect(queryByText("Cette adresse email est invalide")).toBeTruthy();
    expect(queryByText("Ce mot de passe est trop court")).toBeTruthy();
  });

  it("should not renders error messages if I submit the form with valid email and password", async () => {
    const { getByTestId, queryAllByText, queryByText } = render(
      <MockComponent />
    );
    await act(async () => {
      fireEvent.changeText(
        getByTestId("loginEmailInput"),
        "john.doe@orange.fr"
      );
      fireEvent.changeText(getByTestId("loginPasswordInput"), "123456");
      fireEvent.press(getByTestId("loginBtn"));
    });
    expect(queryAllByText("Ce champ est obligatoire")).toHaveLength(0);
    expect(queryByText("Cette adresse email est invalide")).toBeFalsy();
    expect(queryByText("Ce mot de passe est trop court")).toBeFalsy();
  });

  it("should renders a button to navigate to the Register Screen", () => {
    const { getByTestId } = render(<MockComponent />);
    expect(getByTestId("registerNavBtn")).toBeTruthy();
  });

  it("should navigate to the Register Screen if I click on the corresponding button", async () => {
    const navigationMock = jest.fn();
    jest
      .spyOn(Navigation, "useNavigation")
      .mockReturnValue({ navigate: navigationMock });
    const { getByTestId } = render(<MockComponent />);
    await act(async () => {
      fireEvent.press(getByTestId("registerNavBtn"));
    });
    expect(navigationMock).toHaveBeenCalledTimes(1);
    expect(navigationMock).toHaveBeenCalledWith("Register");
  });

  // it("should navigate to the UserLogged Screen if I submit the form with valid email and password", async () => {
  //   server.use(
  //     rest.post("*", (req, res, ctx) => {
  //       console.log(req.text());
  //       return res(
  //         ctx.status(200),
  //         ctx.json({
  //           error: false,
  //           details: "Connexion réussie",
  //           userId: 1,
  //           savedFilmIds: [],
  //         })
  //       );
  //     })
  //   );

  //   const navigationMock = jest.fn();
  //   jest
  //     .spyOn(Navigation, "useNavigation")
  //     .mockReturnValue({ navigate: navigationMock });

  //   const { getByTestId, debug } = renderWithClient(<MockComponent />);
  //   await act(async () => {
  //     fireEvent.changeText(
  //       getByTestId("loginEmailInput"),
  //       "john.doe@orange.fr"
  //     );
  //     fireEvent.changeText(getByTestId("loginPasswordInput"), "123456");
  //     fireEvent.press(getByTestId("loginBtn"));
  //   });
  //   debug();
  //   expect(await navigationMock).toHaveBeenCalledWith("Register");
  //   expect(await navigationMock).toHaveBeenCalledTimes(2);
  // });
});
