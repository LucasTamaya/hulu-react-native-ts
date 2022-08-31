import React from "react";
import { fireEvent, render, act } from "@testing-library/react-native";
import { AnimatePresence } from "moti";
import * as Navigation from "@react-navigation/native";

import { Logout } from "../Logout";
import { AppWrapper } from "../../../../tests/AppWrapper";

// afin d'éviter l'erreur:
// TypeError: Cannot redefine property: useNavigationat Function.defineProperty (<anonymous>)
// at Function.defineProperty (<anonymous>)
jest.mock("@react-navigation/native", () => {
  return {
    __esModule: true,
    ...jest.requireActual("@react-navigation/native"),
  };
});

const setLogoutPopUpMock = jest.fn();

const MockComponent: React.FC = () => {
  return (
    <AppWrapper>
      <AnimatePresence>
        <Logout setLogoutPopUp={setLogoutPopUpMock} />
      </AnimatePresence>
    </AppWrapper>
  );
};

describe("Logout Component", () => {
  it("should renders the component", () => {
    const { getByTestId } = render(<MockComponent />);
    expect(getByTestId("logoutPopUp")).toBeTruthy();
  });

  it("should renders a 'Me déconnecter' button", () => {
    const { getByTestId } = render(<MockComponent />);
    expect(getByTestId("disconnectBtn")).toBeTruthy();
  });

  it("should renders a 'Annuler' button", () => {
    const { getByTestId } = render(<MockComponent />);
    expect(getByTestId("cancelBtn")).toBeTruthy();
  });

  it("should navigate to the Home Screen if I click on the 'Me déconnecter' button", async () => {
    const navigationMock = jest.fn();
    jest
      .spyOn(Navigation, "useNavigation")
      .mockReturnValue({ navigate: navigationMock });
    const { getByTestId } = render(<MockComponent />);
    fireEvent.press(getByTestId("disconnectBtn"));
    expect(navigationMock).toHaveBeenCalledTimes(1);
    expect(navigationMock).toHaveBeenCalledWith("Home");
  });

  it("should call the setLogoutPopUpMock function with false when I click on the 'Annuler' button", async () => {
    const { getByTestId } = render(<MockComponent />);
    fireEvent.press(getByTestId("cancelBtn"));
    expect(setLogoutPopUpMock).toHaveBeenCalledTimes(1);
    expect(setLogoutPopUpMock).toHaveBeenCalledWith(false);
  });
});
