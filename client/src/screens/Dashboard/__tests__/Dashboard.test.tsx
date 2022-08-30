import React from "react";

import { AppWrapper } from "../../../Mocks/AppWrapper";
import { Dashboard } from "../Dashboard";
import { renderWithClient } from "../../../tests/utils";

const MockComponent: React.FC = () => {
  return (
    <AppWrapper>
      <Dashboard />
    </AppWrapper>
  );
};

describe("Dashboard Screen", () => {
  it("should renders the screen", () => {
    const { getByTestId } = renderWithClient(<MockComponent />);
    expect(getByTestId("dashboard")).toBeTruthy();
  });
});
