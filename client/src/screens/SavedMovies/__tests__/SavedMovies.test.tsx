import React from "react";
import { render } from "@testing-library/react-native";

import { AppWrapper } from "../../../Mocks/AppWrapper";
import { SavedMovies } from "../SavedMovies";
import { renderWithClient } from "../../../tests/utils";
import { server } from "../../../Mocks/server";
import { rest } from "msw";
import { act } from "react-test-renderer";

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
  // it("should renders some movie cards if I have saved movies", async () => {
  //   const { findAllByTestId, debug } = renderWithClient(<MockComponent />);
  //   debug();
  //   expect(await findAllByTestId("movieCard")).toHaveLength(0);
  // });
  // it("should renders an error message if there is an error during the fetch request", async () => {
  //   server.use(
  //     rest.get("*", (req, res, ctx) => {
  //       return res(ctx.status(500));
  //     })
  //   );
  //   const { findByText, debug } = renderWithClient(<MockComponent />);
  //   debug();
  //   const message = await findByText("Une erreur est survenue");
  //   expect(message).toBeTruthy();
  // });
});
