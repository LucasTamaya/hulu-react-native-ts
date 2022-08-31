import React from "react";

import { AppWrapper } from "../../../tests/AppWrapper";
import { Search } from "../Search";
import { renderWithClient } from "../../../tests/utils";

const MockComponent: React.FC = () => {
  return (
    <AppWrapper>
      <Search />
    </AppWrapper>
  );
};

describe("Search Screen", () => {
  it("should renders the screen", () => {
    const { getByTestId } = renderWithClient(<MockComponent />);
    expect(getByTestId("search")).toBeTruthy();
  });
});
