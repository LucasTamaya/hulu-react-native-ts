import React from "react";
import { render, fireEvent } from "@testing-library/react-native";

import { Header } from "../Header";
import { AppWrapper } from "../../../../Mocks/AppWrapper";

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
  });

  it("should renders a 'Connexion à mon compte' button", () => {
    const { getByTestId } = render(<MockComponent />);
    expect(getByTestId("login-btn")).toBeTruthy();
  });

  //   it("should navigate to the login screen when I click on the 'Connexion à mon compte' button", () => {
  //     const { getByTestId } = render(<MockComponent />);
  //     expect(getByTestId("header")).toBeTruthy();
  //   });
});
