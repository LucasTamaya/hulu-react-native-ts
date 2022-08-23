import React from "react";
import { render } from "@testing-library/react-native";

import { Login } from "../Login";

describe("LoginScreen", () => {
  it("should renders the component", () => {
    const { getByTestId } = render(<Login />);
    // console.log(component)
    expect(getByTestId("login-screen")).toBeTruthy();
    // expect(true).toBeTruthy();
  });
});
