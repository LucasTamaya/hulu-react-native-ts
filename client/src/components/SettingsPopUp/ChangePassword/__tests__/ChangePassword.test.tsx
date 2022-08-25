import React from "react";
import { act, fireEvent, render } from "@testing-library/react-native";

import { AppWrapper } from "../../../../Mocks/AppWrapper";
import { ChangePassword } from "../ChangePassword";
import { AnimatePresence } from "moti";

// bloque l'erreur: 'ReferenceError: You are trying to `import` a file after the Jest environment has been torn down.'
jest.useFakeTimers();

const setChangePasswordPopUpMock = jest.fn();

const MockComponent: React.FC = () => {
  return (
    <AppWrapper>
      <AnimatePresence>
        <ChangePassword setChangePasswordPopUp={setChangePasswordPopUpMock} />
      </AnimatePresence>
    </AppWrapper>
  );
};

describe("ChangePassword Screen", () => {
  it("should renders the screen", () => {
    const { getByTestId } = render(<MockComponent />);
    expect(getByTestId("changePasswordPopUp")).toBeTruthy();
  });

  it("should renders 2 inputs", () => {
    const { getByTestId } = render(<MockComponent />);
    expect(getByTestId("currentPassword-input")).toBeTruthy();
    expect(getByTestId("newPassword-input")).toBeTruthy();
  });

  it("should renders a 'Modifier' button", () => {
    const { getByTestId } = render(<MockComponent />);
    expect(getByTestId("modify-btn")).toBeTruthy();
  });

  it("should renders a 'Annuler' button", () => {
    const { getByTestId } = render(<MockComponent />);
    expect(getByTestId("cancel-btn")).toBeTruthy();
  });

  it("should renders 2 error messages if I submit the form with empty inputs", async () => {
    const { getByTestId, queryAllByText } = render(<MockComponent />);
    await act(async () => {
      fireEvent.press(getByTestId("modify-btn"));
    });
    expect(queryAllByText("Ce champ est obligatoire")).toHaveLength(2);
  });

  it("should render 2 error messages if I submit the form with invalid inputs", async () => {
    const { getByTestId, queryAllByText } = render(<MockComponent />);
    await act(async () => {
      fireEvent.changeText(getByTestId("currentPassword-input"), "12345");
      fireEvent.changeText(getByTestId("newPassword-input"), "12345");
      fireEvent.press(getByTestId("modify-btn"));
    });
    expect(queryAllByText("Ce mot de passe est trop court")).toHaveLength(2);
  });

  it("should not renders error messages if I submit the form with valid inputs", async () => {
    const { getByTestId, queryAllByText } = render(<MockComponent />);
    await act(async () => {
      fireEvent.changeText(getByTestId("currentPassword-input"), "abc123456");
      fireEvent.changeText(getByTestId("newPassword-input"), "abc123456");
      fireEvent.press(getByTestId("modify-btn"));
    });
    expect(queryAllByText("Ce champ est obligatoire")).toHaveLength(0);
    expect(queryAllByText("Ce mot de passe est trop court")).toHaveLength(0);
  });

  it("should call the setChangePasswordPopUp function with false in parameter when I click on the 'Annuler' button", async () => {
    const { getByTestId } = render(<MockComponent />);
    await act(async () => {
      fireEvent.press(getByTestId("cancel-btn"));
    });
    expect(setChangePasswordPopUpMock).toHaveBeenCalledWith(false);
  });
});
