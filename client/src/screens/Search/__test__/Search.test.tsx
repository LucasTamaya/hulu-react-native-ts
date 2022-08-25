import React from "react";
import { render } from "@testing-library/react-native";

import { AppWrapper } from "../../../Mocks/AppWrapper";
import { Search } from "../Search";

const MockComponent: React.FC = () => {
  return (
    <AppWrapper>
      <Search />
    </AppWrapper>
  );
};

describe("Search Screen", () => {
  it("should renders the screen", () => {
    const { getByTestId } = render(<MockComponent />);
    expect(getByTestId("search")).toBeTruthy();
  });
});
