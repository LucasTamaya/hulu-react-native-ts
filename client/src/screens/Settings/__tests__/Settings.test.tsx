import React from "react";
import { cleanup, fireEvent, render } from "@testing-library/react-native";
import * as Navigation from "@react-navigation/native";
import { Linking } from "react-native";

import { AppWrapper } from "../../../tests/AppWrapper";
import { Settings } from "../Settings";
import { renderWithClient } from "../../../tests/utils";

jest.mock("@react-navigation/native", () => {
  return {
    __esModule: true,
    ...jest.requireActual("@react-navigation/native"),
  };
});

// bloque l'erreur: 'ReferenceError: You are trying to `import` a file after the Jest environment has been torn down.'
jest.useFakeTimers();

const MockComponent: React.FC = () => {
  return (
    <AppWrapper>
      <Settings />
    </AppWrapper>
  );
};

describe("Settings Screen", () => {
  afterEach(cleanup);

  it("should renders the screen", () => {
    const { getByTestId } = renderWithClient(<MockComponent />);
    expect(getByTestId("settings")).toBeTruthy();
  });

  it("should renders 5 buttons", () => {
    const { getByTestId } = renderWithClient(<MockComponent />);
    expect(getByTestId("logoutBtn")).toBeTruthy();
    expect(getByTestId("changePwdBtn")).toBeTruthy();
    expect(getByTestId("legalNavBtn")).toBeTruthy();
    expect(getByTestId("linkedinNavBtn")).toBeTruthy();
    expect(getByTestId("githubNavBtn")).toBeTruthy();
  });

  it("should open the LogoutPopUp if I click on the corresponding button", async () => {
    const { getByTestId, findByTestId } = renderWithClient(<MockComponent />);
    fireEvent.press(getByTestId("logoutBtn"));
    expect(findByTestId("logoutPopUp")).toBeTruthy();
  });

  it("should open the changePwdPopup if I click on the corresponding button", async () => {
    const { getByTestId, findByTestId } = renderWithClient(<MockComponent />);
    fireEvent.press(getByTestId("changePwdBtn"));
    expect(findByTestId("changePwdPopup")).toBeTruthy();
  });

  it("should navigate to the Legal Screen if I click on the corresponding button", async () => {
    const navigationMock = jest.fn();
    jest
      .spyOn(Navigation, "useNavigation")
      .mockReturnValue({ navigate: navigationMock });
    const { getByTestId } = renderWithClient(<MockComponent />);
    fireEvent.press(getByTestId("legalNavBtn"));
    expect(navigationMock).toHaveBeenCalledWith("Legal");
  });

  it("should open my browser and navigate to my linkedin profile if I click on the corresponding button", async () => {
    const linkingMock = jest.fn(async (url: string) => {});

    const { getByTestId } = render(<MockComponent />);
    fireEvent.press(getByTestId("linkedinNavBtn"));
    expect(Linking.openURL).toHaveBeenCalledWith(
      "https://www.linkedin.com/in/lucas-tamaya-41a09621b/"
    );
  });

  it("should open my browser and navigate to my github profile if I click on the corresponding button", async () => {
    const { getByTestId } = render(<MockComponent />);
    fireEvent.press(getByTestId("githubNavBtn"));
    expect(Linking.openURL).toHaveBeenCalledWith(
      "https://github.com/LucasTamaya"
    );
  });
});
