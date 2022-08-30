import React from "react";
import { render } from "@testing-library/react-native";

import { AppWrapper } from "../../../Mocks/AppWrapper";
import { Dashboard } from "../Dashboard";

const MockComponent: React.FC = () => {
  return (
    <AppWrapper>
      <Dashboard />
    </AppWrapper>
  );
};

describe("Dashboard Screen", () => {
  it("should renders the screen", () => {
    const { getByTestId } = render(<MockComponent />);
    expect(getByTestId("dashboard")).toBeTruthy();
  });
});
