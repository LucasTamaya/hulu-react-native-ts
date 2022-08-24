import React from "react";
import { render } from "@testing-library/react-native";

import { AppWrapper } from "../../../../Mock/AppWrapper";
import { Cover } from "../Cover";

const MockComponent: React.FC = () => {
  return (
    <AppWrapper>
      <Cover
        bgSrc={require("../../../../../assets/images/cover-1.jpg")}
        details="Cover Details"
        category="Cover Category"
      />
    </AppWrapper>
  );
};

describe("Cover Component", () => {
  it("should renders the component", () => {
    const { getByTestId, getByText } = render(<MockComponent />);
    expect(getByTestId("cover").props.source).toBe(1);
    expect(getByText("Cover Details")).toBeTruthy();
    expect(getByText("Cover Category")).toBeTruthy();
  });
});
