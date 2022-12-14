import React from "react";
import { act, fireEvent } from "@testing-library/react-native";

import { AppWrapper } from "../../../../tests/AppWrapper";
import { ChangePassword } from "../ChangePassword";
import { AnimatePresence } from "moti";
import { renderWithClient } from "../../../../tests/utils";

// bloque l'erreur: 'ReferenceError: You are trying to `import` a file after the Jest environment has been torn down.'
jest.useFakeTimers();

const mockSetShowPwdPopUp = jest.fn();

const MockComponent: React.FC = () => {
  return (
    <AppWrapper>
      <AnimatePresence>
        <ChangePassword setShowPwdPopUp={mockSetShowPwdPopUp} />
      </AnimatePresence>
    </AppWrapper>
  );
};

describe("ChangePassword Screen", () => {
  it("should renders the screen", () => {
    const { getByTestId } = renderWithClient(<MockComponent />);
    expect(getByTestId("changePwdPopUp")).toBeTruthy();
  });

  it("should renders 2 inputs", () => {
    const { getByTestId } = renderWithClient(<MockComponent />);
    expect(getByTestId("currentPwdInput")).toBeTruthy();
    expect(getByTestId("newPwdInput")).toBeTruthy();
  });

  it("should renders a 'Modifier' button", () => {
    const { getByTestId } = renderWithClient(<MockComponent />);
    expect(getByTestId("modifyBtn")).toBeTruthy();
  });

  it("should renders a 'Annuler' button", () => {
    const { getByTestId } = renderWithClient(<MockComponent />);
    expect(getByTestId("cancelBtn")).toBeTruthy();
  });

  it("should renders 2 error messages if I submit the form with empty inputs", async () => {
    const { getByTestId, queryAllByText } = renderWithClient(<MockComponent />);
    await act(async () => {
      fireEvent.press(getByTestId("modifyBtn"));
    });
    expect(queryAllByText("Ce champ est obligatoire")).toHaveLength(2);
  });

  it("should render 2 error messages if I submit the form with invalid inputs", async () => {
    const { getByTestId, queryAllByText } = renderWithClient(<MockComponent />);
    await act(async () => {
      fireEvent.changeText(getByTestId("currentPwdInput"), "12345");
      fireEvent.changeText(getByTestId("newPwdInput"), "12345");
      fireEvent.press(getByTestId("modifyBtn"));
    });
    expect(queryAllByText("Ce mot de passe est trop court")).toHaveLength(2);
  });

  it("should not renders error messages if I submit the form with valid inputs", async () => {
    const { getByTestId, queryAllByText } = renderWithClient(<MockComponent />);
    await act(async () => {
      fireEvent.changeText(getByTestId("currentPwdInput"), "abc123456");
      fireEvent.changeText(getByTestId("newPwdInput"), "abc123456");
      fireEvent.press(getByTestId("modifyBtn"));
    });
    expect(queryAllByText("Ce champ est obligatoire")).toHaveLength(0);
    expect(queryAllByText("Ce mot de passe est trop court")).toHaveLength(0);
  });

  it("should call the setchangePwdPopUp function with false in parameter when I click on the 'Annuler' button", async () => {
    const { getByTestId } = renderWithClient(<MockComponent />);
    await act(async () => {
      fireEvent.press(getByTestId("cancelBtn"));
    });
    expect(mockSetShowPwdPopUp).toHaveBeenCalledTimes(1);
    expect(mockSetShowPwdPopUp).toHaveBeenCalledWith(false);
  });
});
