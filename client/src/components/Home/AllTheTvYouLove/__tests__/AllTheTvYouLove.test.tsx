import React from "react";
import { render } from "@testing-library/react-native";

import { AllTheTvYouLove } from "../AllTheTvYouLove";
import { AppWrapper } from "../../../../tests/AppWrapper";

const MockComponent: React.FC = () => {
  return (
    <AppWrapper>
      <AllTheTvYouLove />
    </AppWrapper>
  );
};

describe("AllTheTvYouLove Component", () => {
  it("should renders the component", () => {
    const { getByTestId, getByText } = render(<MockComponent />);
    expect(getByTestId("allTheTvYouLove")).toBeTruthy();
    expect(getByText(/Inclus dans tous les plans/i)).toBeTruthy();
    expect(getByText(/All The TV You Love/i)).toBeTruthy();
    expect(
      getByText(/Regardez en streaming des saisons complètes/i)
    ).toBeTruthy();
  });

  it("should renders 4 covers", () => {
    const { getAllByTestId } = render(<MockComponent />);
    expect(getAllByTestId("cover")).toHaveLength(4);
  });
});
