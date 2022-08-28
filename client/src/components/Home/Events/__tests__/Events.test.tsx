import React from "react";
import { act, fireEvent, render } from "@testing-library/react-native";
import * as Navigation from "@react-navigation/native";

import { AppWrapper } from "../../../../Mocks/AppWrapper";
import { Events } from "../Events";

jest.mock("@react-navigation/native", () => {
  return {
    __esModule: true,
    ...jest.requireActual("@react-navigation/native"),
  };
});

const MockComponent: React.FC = () => {
  return (
    <AppWrapper>
      <Events />
    </AppWrapper>
  );
};

describe("Events Component", () => {
  it("should renders the component", () => {
    const { getByTestId } = render(<MockComponent />);
    expect(getByTestId("events")).toBeTruthy();
  });

  it("should renders a background image", () => {
    const { getByTestId } = render(<MockComponent />);
    expect(getByTestId("bg-image")).toBeTruthy();
  });

  it("should renders 3 events buttons", () => {
    const { getByText } = render(<MockComponent />);
    expect(getByText("Live Sports")).toBeTruthy();
    expect(getByText("Breaking news")).toBeTruthy();
    expect(getByText("Biggest events")).toBeTruthy();
  });

  it("should shows the Live Sports background image when I click on the corresponding button ", () => {
    const { getByTestId } = render(<MockComponent />);
    fireEvent.press(getByTestId("liveSportsBtn"));
    expect(getByTestId("bg-image").props.source.uri).toEqual(
      "https://www.hulu.com/static/hitch/s3/attachments/ckzixd47am2l91k7r9dvzt0bi-ckuh9mwn808iv1v31u5qhc0lj-ckqwp3dbnf39o1j5snovs92yr-welcome-v6-sports-min-1-full-full.jpg"
    );
  });

  it("should shows the Breaking New background image when I click on the corresponding button ", () => {
    const { getByTestId } = render(<MockComponent />);
    fireEvent.press(getByTestId("breakingNewsBtn"));
    expect(getByTestId("bg-image").props.source.uri).toEqual(
      "https://www.hulu.com/static/hitch/s3/attachments/ckzixevqgs6rn1k4eh3si78i5-ckuh9mwgf07wx1v3w11vwnm7v-ckqip0kn59nkn1u4y1pbrygdu-news-375x760-2x-full-full.jpg"
    );
  });

  it("should shows the Biggest Events background image when I click on the corresponding button ", () => {
    const { getByTestId } = render(<MockComponent />);
    fireEvent.press(getByTestId("biggestEventsBtn"));
    expect(getByTestId("bg-image").props.source.uri).toEqual(
      "https://www.hulu.com/static/hitch/s3/attachments/ckzixgoqcs6t91k56rxwnqi42-ckuh9mwhe08r61v07uaz109j1-ckqip58nxmxz71u3nhauv2qpx-biggest-events-375x760-2x-full-full.jpg"
    );
  });

  it("should renders a 'Connexion à mon compte' button", () => {
    const { getByTestId } = render(<MockComponent />);
    expect(getByTestId("loginNavBtn")).toBeTruthy();
  });

  it("should navigate to the Login Screen if I click on the corresponding button", async () => {
    const navigationMock = jest.fn();
    jest
      .spyOn(Navigation, "useNavigation")
      .mockReturnValue({ navigate: navigationMock });
    const { getByTestId } = render(<MockComponent />);
    await act(async () => {
      fireEvent.press(getByTestId("loginNavBtn"));
    });
    expect(navigationMock).toHaveBeenCalledTimes(1);
    expect(navigationMock).toHaveBeenCalledWith("Login");
  });
});
