import React from "react";
import { render } from "@testing-library/react-native";

import { AppWrapper } from "../../../../../Mocks/AppWrapper";
import { renderWithClient } from "../../../../../tests/utils";
import { List } from "../List";
import { server } from "../../../../../Mocks/server";

// Establish API mocking before all tests.
beforeAll(() => server.listen());
// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => {
  server.resetHandlers();
});
// Clean up after the tests are finished.
afterAll(() => server.close());

const MockComponent: React.FC = () => {
  return (
    <AppWrapper>
      <List />
    </AppWrapper>
  );
};

describe("MovieList Component", () => {
  it("should renders the component", () => {
    const { getByTestId } = render(<MockComponent />);
    expect(getByTestId("movieList")).toBeTruthy();
  });

  it("should renders 20 Movie Cards when fetch request is done", async () => {
    const { findAllByTestId } = renderWithClient(<MockComponent />);
    expect(await findAllByTestId("movieCard")).toHaveLength(20);
  });

  // it("should shows an error message if the fetch request fails", async () => {
  //   server.use(
  //     rest.get("*", (req, res, ctx) => {
  //       console.log("je suis dans la requete d'erreur");
  //       return res(ctx.status(500));
  //     })
  //   );

  //   const { findByTestId, findByText } = renderWithClient(<MockComponent />);
  //   await act(async () => {
  //     waitForElementToBeRemoved(() => findByTestId("loading"));
  //   });
  //   // debug();
  //   expect(
  //     await findByText("Une erreur est survenue au niveau du serveur interne")
  //   ).toBeTruthy();
  // });
});
