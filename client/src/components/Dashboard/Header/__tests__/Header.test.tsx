import React from "react";
import { render } from "@testing-library/react-native";

import { AppWrapper } from "../../../../Mock/AppWrapper";
import { Header } from "../Header";

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
    expect(getByTestId("header-img")).toBeTruthy();
  });
});
