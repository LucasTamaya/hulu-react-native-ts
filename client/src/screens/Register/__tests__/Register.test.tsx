import React from "react";
import { act, fireEvent, render } from "@testing-library/react-native";

import { AppWrapper } from "../../../Mock/AppWrapper";
import { Register } from "../Register";

const MockComponent: React.FC = () => {
  return (
    <AppWrapper>
      <Register />
    </AppWrapper>
  );
};

describe("Register Screen", () => {
  it("should renders the component", () => {
    const { getByTestId } = render(<MockComponent />);
    expect(getByTestId("register")).toBeTruthy();
  });

  it("should renders 3 inputs", () => {
    const { getByTestId } = render(<MockComponent />);
    expect(getByTestId("register-nameInput")).toBeTruthy();
    expect(getByTestId("register-emailInput")).toBeTruthy();
    expect(getByTestId("register-passwordInput")).toBeTruthy();
  });

  it("should renders a 'Créer mon compte' button", () => {
    const { getByTestId } = render(<MockComponent />);
    expect(getByTestId("register-btn")).toBeTruthy();
  });

  it("should renders 3 error messages if I submit the form with empty inputs", async () => {
    const { getByTestId, queryAllByText } = render(<MockComponent />);
    await act(async () => {
      fireEvent.press(getByTestId("register-btn"));
    });
    expect(queryAllByText("Ce champ est obligatoire")).toHaveLength(3);
  });

  it("should renders 3 error messages if I submit the form with invalid name, email and password", async () => {
    const { getByTestId, queryByText } = render(<MockComponent />);
    await act(async () => {
      fireEvent.changeText(getByTestId("register-nameInput"), "j");
      fireEvent.changeText(getByTestId("register-emailInput"), "john.doe.fr12");
      fireEvent.changeText(getByTestId("register-passwordInput"), "123");
      fireEvent.press(getByTestId("register-btn"));
    });
    expect(queryByText("Ce nom est invalide")).toBeTruthy();
    expect(queryByText("Cette adresse email est invalide")).toBeTruthy();
    expect(queryByText("Ce mot de passe est trop court")).toBeTruthy();
  });

  it("should not renders error messages if I submit the form with valid name, email and password", async () => {
    const { getByTestId, queryAllByText, queryByText } = render(
      <MockComponent />
    );
    await act(async () => {
      fireEvent.changeText(getByTestId("register-nameInput"), "john");
      fireEvent.changeText(
        getByTestId("register-emailInput"),
        "john.doe@orange.fr"
      );
      fireEvent.changeText(getByTestId("register-passwordInput"), "123456");
      fireEvent.press(getByTestId("register-btn"));
    });
    expect(queryAllByText("Ce champ est obligatoire")).toHaveLength(0);
    expect(queryByText("Ce nom est invalide")).toBeFalsy();
    expect(queryByText("Cette adresse email est invalide")).toBeFalsy();
    expect(queryByText("Ce mot de passe est trop court")).toBeFalsy();
  });

  it("should renders a button to navigate to the login screen", () => {
    const { getByTestId } = render(<MockComponent />);
    expect(getByTestId("login-navBtn")).toBeTruthy();
  });
});
