import React from "react";
import { render, fireEvent, act } from "@testing-library/react-native";
import * as Navigation from "@react-navigation/native";

import { Header } from "../Header";
import { AppWrapper } from "../../../../Mocks/AppWrapper";

jest.mock("@react-navigation/native", () => {
  return {
    __esModule: true,
    ...jest.requireActual("@react-navigation/native"),
  };
});

const MockComponent: React.FC = () => {
  return (
    <AppWrapper>
      <Header />
    </AppWrapper>
  );
};

describe("Header Component", () => {
  it("should renders the component", () => {
    const { getByTestId } = render(<MockComponent />);
    expect(getByTestId("header")).toBeTruthy();
  });

  it("should renders a 'LOG IN' button", () => {
    const { getByTestId } = render(<MockComponent />);
    expect(getByTestId("loginNavBtn1")).toBeTruthy();
  });

  it("should renders a 'Connexion à mon compte' button", () => {
    const { getByTestId } = render(<MockComponent />);
    expect(getByTestId("loginNavBtn2")).toBeTruthy();
  });

  it("should navigate to the Login Screen if I click on the 'LOG IN' button", async () => {
    const navigationMock = jest.fn();
    jest
      .spyOn(Navigation, "useNavigation")
      .mockReturnValue({ navigate: navigationMock });
    const { getByTestId } = render(<MockComponent />);
    await act(async () => {
      fireEvent.press(getByTestId("loginNavBtn1"));
    });
    expect(navigationMock).toHaveBeenCalledTimes(1);
    expect(navigationMock).toHaveBeenCalledWith("Login");
  });

  it("should navigate to the Login Screen if I click on the 'Connexion à mon compte' button", async () => {
    const navigationMock = jest.fn();
    jest
      .spyOn(Navigation, "useNavigation")
      .mockReturnValue({ navigate: navigationMock });
    const { getByTestId } = render(<MockComponent />);
    await act(async () => {
      fireEvent.press(getByTestId("loginNavBtn2"));
    });
    expect(navigationMock).toHaveBeenCalledTimes(1);
    expect(navigationMock).toHaveBeenCalledWith("Login");
  });
});
