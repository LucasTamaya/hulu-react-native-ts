import React from "react";
import { rest } from "msw";

import { AppWrapper } from "../../../../../tests/AppWrapper";
import { renderWithClient } from "../../../../../tests/utils";
import { List } from "../List";
import { server } from "../../../../../tests/server";

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

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
    const { getByTestId } = renderWithClient(<MockComponent />);
    expect(getByTestId("movieList")).toBeTruthy();
  });

  it("should renders 20 Movie Cards when fetch request is done", async () => {
    const { findAllByTestId } = renderWithClient(<MockComponent />);
    expect(await findAllByTestId("movieCard")).toHaveLength(20);
  });

  it("should shows an error message if the fetch request fails", async () => {
    server.use(
      rest.get("*", (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    const { findByText } = renderWithClient(<MockComponent />);

    expect(
      await findByText("Une erreur est survenue au niveau du serveur interne")
    ).toBeTruthy();
  });
});
