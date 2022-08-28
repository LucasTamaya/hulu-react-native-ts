import React from "react";
import {
  render,
  waitForElementToBeRemoved,
} from "@testing-library/react-native";
import { rest } from "msw";

import { AppWrapper } from "../../../../../Mocks/AppWrapper";
import { renderWithClient } from "../../../../../tests/utils";
import { List } from "../List";
import { server } from "../../../../../Mocks/server";

// Establish API mocking before all tests.
beforeAll(() => server.listen());
// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());
// Clean up after the tests are finished.
afterAll(() => server.close());

const MockComponent: React.FC = () => {
  return (
    <AppWrapper>
      <List />
    </AppWrapper>
  );
};

describe("Movie List Component", () => {
  it("should renders the component", () => {
    const { getByTestId } = render(<MockComponent />);
    expect(getByTestId("movieList")).toBeTruthy();
  });

  it("should renders 20 Movie Cards when fetch request is done", async () => {
    const { findAllByTestId } = renderWithClient(<MockComponent />);
    expect(await findAllByTestId("movieCard")).toHaveLength(20);
  });

  //   it("should shows an error message if the fetch request fails", async () => {
  //     server.use(
  //       rest.get("*", (req, res, ctx) => {
  //         return res(ctx.status(500));
  //       })
  //     );
  //     const { findByText, findByTestId, debug, getByTestId } = renderWithClient(
  //       <MockComponent />
  //     );
  //     beforeEach(async () => {
  //       await waitForElementToBeRemoved(() => findByTestId("loading"));
  //     });
  //     debug();
  //     expect(await findByText("Error")).toBeTruthy();
  //   });
});
