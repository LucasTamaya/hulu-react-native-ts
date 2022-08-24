import React from "react";
import { render } from "@testing-library/react-native";

import { AppWrapper } from "../../../../Mock/AppWrapper";
import { LiveTvMakesItBetter } from "../LiveTvMakesItBetter";

const MockComponent: React.FC = () => {
  return (
    <AppWrapper>
      <LiveTvMakesItBetter />
    </AppWrapper>
  );
};

describe("LiveTvMakesItBetter Component", () => {
  it("should renders the component", () => {
    const { getByTestId } = render(<MockComponent />);
    expect(getByTestId("liveTvMakesItBetter")).toBeTruthy();
  });

  it("should renders 2 icons", () => {
    const { getAllByTestId } = render(<MockComponent />);
    expect(getAllByTestId("icon")).toHaveLength(2);
  });
});
