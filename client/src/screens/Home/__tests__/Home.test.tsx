import React from "react";
import { render } from "@testing-library/react-native";

import { Home } from "../Home";
import { AppWrapper } from "../../../Mock/AppWrapper";

describe("HomeScreen", () => {
  it("should renders the component", () => {
    const { getByTestId } = render(
      <AppWrapper>
        <Home />
      </AppWrapper>
    );
    expect(getByTestId("home")).toBeTruthy();
  });
});
