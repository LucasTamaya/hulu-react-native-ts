import React from "react";
import { render } from "@testing-library/react-native";

import { AppWrapper } from "../../../Mock/AppWrapper";
import { SavedFilms } from "../SavedFilms";

const MockComponent: React.FC = () => {
  return (
    <AppWrapper>
      <SavedFilms />
    </AppWrapper>
  );
};

describe("SavedFilms Screen", () => {
  it("should renders the component", () => {
    const { getByTestId } = render(<MockComponent />);
    expect(getByTestId("savedFilms")).toBeTruthy();
  });
});
