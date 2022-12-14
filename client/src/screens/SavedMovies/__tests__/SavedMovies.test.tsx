import React from "react";
import { rest } from "msw";

import { AppWrapper } from "../../../tests/AppWrapper";
import { SavedMovies } from "../SavedMovies";
import { renderWithClient } from "../../../tests/utils";
import { server } from "../../../tests/server";

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

const MockComponent: React.FC = () => {
  return (
    <AppWrapper>
      <SavedMovies />
    </AppWrapper>
  );
};

describe("SavedFilms Screen", () => {
  it("should renders the screen", () => {
    const { getByTestId } = renderWithClient(<MockComponent />);
    expect(getByTestId("savedFilms")).toBeTruthy();
  });

  it("should renders some movie cards if I have saved movies", async () => {
    const { findAllByTestId } = renderWithClient(<MockComponent />);
    expect(await findAllByTestId("movieCard")).toHaveLength(20);
  });

  it("should renders an error message if there is an error during the fetch request", async () => {
    server.use(
      rest.get("*", (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );
    const { findByText } = renderWithClient(<MockComponent />);
    expect(
      await findByText("Une erreur est survenue, veuillez réessayer")
    ).toBeTruthy();
  });
});
