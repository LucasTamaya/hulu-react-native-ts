import React from "react";
import { render } from "@testing-library/react-native";

import { AppWrapper } from "../../../tests/AppWrapper";
import { StateMessage } from "../StateMessage";

interface Props {
  message: string;
  error: boolean;
}
const MockComponent: React.FC<Props> = ({ message, error }) => {
  return (
    <AppWrapper>
      <StateMessage message={message} error={error} />
    </AppWrapper>
  );
};

describe("StateMessage Component", () => {
  it("should renders the component if there is no error", async () => {
    const { getByText, findByTestId } = render(
      <MockComponent message="This is a success message" error={false} />
    );
    expect(getByText("This is a success message")).toBeTruthy();
    expect(await findByTestId("checkIcon")).toBeTruthy();
  });

  it("should renders the component if there is an error", async () => {
    const { getByText, findByTestId } = render(
      <MockComponent message="This is an error message" error={true} />
    );
    expect(getByText("This is an error message")).toBeTruthy();
    expect(await findByTestId("crossIcon")).toBeTruthy();
  });
});
