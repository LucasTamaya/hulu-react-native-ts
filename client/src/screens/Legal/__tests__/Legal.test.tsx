import React from "react";
import { render } from "@testing-library/react-native";

import { AppWrapper } from "../../../tests/AppWrapper";
import { Legal } from "../Legal";

const MockComponent: React.FC = () => {
  return (
    <AppWrapper>
      <Legal />
    </AppWrapper>
  );
};

describe("Legal Screen", () => {
  it("should renders the component", () => {
    const { getByTestId } = render(<MockComponent />);
    expect(getByTestId("legal")).toBeTruthy();
  });
});
