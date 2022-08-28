import React from "react";
import { render } from "@testing-library/react-native";

import { AppWrapper } from "../../../../Mocks/AppWrapper";
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
    const { getByTestId, getByText, debug } = render(<MockComponent />);
    expect(getByTestId("liveTvMakesItBetter")).toBeTruthy();
    debug();
    expect(
      getByText("Hulu + live tv, maintenant avec disney+ and espn+")
    ).toBeTruthy();
    expect(getByText("Live TV Makes It Better")).toBeTruthy();
    expect(
      getByText(
        /Abandonnez le câble. Obtenez plus de 75 chaînes de premier plan sur/i
      )
    ).toBeTruthy();
    expect(getByText(/Voir les chaînes dans votre région/i)).toBeTruthy();
  });

  it("should renders 2 icons", () => {
    const { getAllByTestId } = render(<MockComponent />);
    expect(getAllByTestId("icon")).toHaveLength(2);
  });
});
