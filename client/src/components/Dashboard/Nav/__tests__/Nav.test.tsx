import React from "react";
import { fireEvent, render } from "@testing-library/react-native";

import { AppWrapper } from "../../../../Mocks/AppWrapper";
import { Nav } from "../Nav";

const mockIndex = 0;
const mockSetIndex = jest.fn();

const MockComponent: React.FC = () => {
  return (
    <AppWrapper index={mockIndex} setIndex={mockSetIndex}>
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
    const { getAllByTestId } = render(<MockComponent />);
    expect(getAllByTestId("navBtn")).toHaveLength(11);
  });

  it("should call the setIndex function with the appropriate number in parameter if I click on a navigation button", async () => {
    const { getAllByTestId } = render(<MockComponent />);
    getAllByTestId("navBtn").map((button, idx) => {
      fireEvent.press(button);
      expect(mockSetIndex).toHaveBeenCalledWith(idx);
    });
  });
});
