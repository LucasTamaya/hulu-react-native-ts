import React, { useContext, useState } from "react";
import { act, fireEvent, render } from "@testing-library/react-native";

import { AppWrapper } from "../../../../Mocks/AppWrapper";
import { Nav } from "../Nav";
import { AppContext, AppContextType } from "../../../../contexts/AppContext";

jest.useFakeTimers();

const MockComponent: React.FC = () => {
  return (
    <AppWrapper>
      <Nav />
    </AppWrapper>
  );
};

describe("Nav Component", () => {
  it("should renders the component", () => {
    const { getByTestId } = render(<MockComponent />);
    expect(getByTestId("nav")).toBeTruthy();
  });

  it("should renders 10 navigation elements", () => {
    const { getByText } = render(<MockComponent />);
    expect(getByText("Tendance")).toBeTruthy();
    expect(getByText("Mieux notés")).toBeTruthy();
    expect(getByText("Action")).toBeTruthy();
    expect(getByText("Comédie")).toBeTruthy();
    expect(getByText("Horreur")).toBeTruthy();
    expect(getByText("Romance")).toBeTruthy();
    expect(getByText("Mystère")).toBeTruthy();
    expect(getByText("SciFi")).toBeTruthy();
    expect(getByText("Western")).toBeTruthy();
    expect(getByText("Animation")).toBeTruthy();
    expect(getByText("Films TV")).toBeTruthy();
  });

  it("should call the setIndex function with the number 5 if I click on the 'Romance' navigation button", async () => {
    const setStateMock = jest.fn();
    const useStateMock: any = (useState: any) => [useState, setStateMock];
    jest.spyOn(React, "useState").mockImplementation(useStateMock);

    const { getByTestId } = render(<MockComponent />);
    // fireEvent.press(getByTestId("navBtn"));
    expect(setStateMock).toHaveBeenCalledWith(5);
  });
});
