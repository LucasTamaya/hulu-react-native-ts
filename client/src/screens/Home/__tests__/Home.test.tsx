import React from "react";
import { render } from "@testing-library/react-native";

import { Home } from "../Home";
import { AppWrapper } from "../../../Mocks/AppWrapper";

const MockComponent: React.FC = () => {
  return (
    <AppWrapper>
      <Home />
    </AppWrapper>
  );
};

describe("Home Screen", () => {
  it("should renders the screen", () => {
    const { getByTestId } = render(<MockComponent />);
    expect(getByTestId("home")).toBeTruthy();
  });
});
