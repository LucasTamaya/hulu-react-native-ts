import React from "react";
import { act, fireEvent, render } from "@testing-library/react-native";

import { Login } from "../Login";
import { AppWrapper } from "../../../Mocks/AppWrapper";

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
    expect(getByTestId("login-emailInput")).toBeTruthy();
    expect(getByTestId("login-passwordInput")).toBeTruthy();
  });

  it("should renders a 'Connexion' button", () => {
    const { getByTestId } = render(<MockComponent />);
    expect(getByTestId("login-btn")).toBeTruthy();
  });

  it("should renders 2 error messages if I submit the form with empty inputs", async () => {
    const { getByTestId, queryAllByText } = render(<MockComponent />);
    await act(async () => {
      fireEvent.press(getByTestId("login-btn"));
    });
    expect(queryAllByText("Ce champ est obligatoire")).toHaveLength(2);
  });

  it("should renders 2 error messages if I submit the form with invalid email and password", async () => {
    const { getByTestId, queryByText } = render(<MockComponent />);
    await act(async () => {
      fireEvent.changeText(getByTestId("login-emailInput"), "john.doe.fr12");
      fireEvent.changeText(getByTestId("login-passwordInput"), "123");
      fireEvent.press(getByTestId("login-btn"));
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
        getByTestId("login-emailInput"),
        "john.doe@orange.fr"
      );
      fireEvent.changeText(getByTestId("login-passwordInput"), "123456");
      fireEvent.press(getByTestId("login-btn"));
    });
    expect(queryAllByText("Ce champ est obligatoire")).toHaveLength(0);
    expect(queryByText("Cette adresse email est invalide")).toBeFalsy();
    expect(queryByText("Ce mot de passe est trop court")).toBeFalsy();
  });

  it("should renders a button to navigate to the register screen", () => {
    const { getByTestId } = render(<MockComponent />);
    expect(getByTestId("register-navBtn")).toBeTruthy();
  });
});
