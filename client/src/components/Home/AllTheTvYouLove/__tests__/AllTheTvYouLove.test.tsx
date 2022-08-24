import React from "react";
import { render } from "@testing-library/react-native";

import { AllTheTvYouLove } from "../AllTheTvYouLove";
import { AppWrapper } from "../../../../Mock/AppWrapper";

const MockComponent: React.FC = () => {
  return (
    <AppWrapper>
      <AllTheTvYouLove />
    </AppWrapper>
  );
};

describe("AllTheTvYouLove Component", () => {
  it("should renders the component", () => {
    const { getByTestId } = render(<MockComponent />);
    expect(getByTestId("allTheTvYouLove")).toBeTruthy();
  });

  it("should renders 4 covers", () => {
    const { getAllByTestId } = render(<MockComponent />);
    expect(getAllByTestId("cover")).toHaveLength(4);
  });
});
