import React from "react";
import { act, fireEvent } from "@testing-library/react-native";
import { rest } from "msw";

import { AppWrapper } from "../../../../Mocks/AppWrapper";
import { SearchBar } from "../SearchBar";
import { server } from "../../../../Mocks/server";
import { renderWithClient } from "../../../../tests/utils";

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

const MockComponent: React.FC = () => {
  return (
    <AppWrapper>
      <SearchBar />
    </AppWrapper>
  );
};

describe("SearchBar Component", () => {
  it("should renders the component", () => {
    const { getByTestId } = renderWithClient(<MockComponent />);
    expect(getByTestId("searchBar")).toBeTruthy();
  });

  it("should renders a search button", () => {
    const { getByTestId } = renderWithClient(<MockComponent />);
    expect(getByTestId("search-btn")).toBeTruthy();
  });

  it("should renders an input", () => {
    const { getByPlaceholderText } = renderWithClient(<MockComponent />);
    expect(
      getByPlaceholderText("Rechercher un film, une série...")
    ).toBeTruthy();
  });

  it("should renders a movie card when I search for an existing movie", async () => {
    const { getByPlaceholderText, getByTestId } = renderWithClient(
      <MockComponent />
    );
    await act(async () => {
      fireEvent.changeText(
        getByPlaceholderText("Rechercher un film, une série..."),
        "A super film"
      );
      fireEvent.press(getByTestId("search-btn"));
    });
    expect(getByTestId("movieCard")).toBeTruthy();
    expect(getByTestId("movieCardImg")).toBeTruthy();
    expect(getByTestId("movieCardImg").props.source.uri).toBe(
      "https://image.tmdb.org/t/p/original/film_poster_path.jpg"
    );
  });

  it("should renders an error message if I search for an non existing movie", async () => {
    server.use(
      rest.get("*", (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            results: [],
          })
        );
      })
    );
    const { getByPlaceholderText, getByTestId, getByText } = renderWithClient(
      <MockComponent />
    );
    const SEARCH_INPUT = "faengaeghaehe";
    await act(async () => {
      fireEvent.changeText(
        getByPlaceholderText("Rechercher un film, une série..."),
        SEARCH_INPUT
      );
      fireEvent.press(getByTestId("search-btn"));
    });
    expect(
      getByText(`Nous n'avons rien trouvé à propos de ${SEARCH_INPUT}`)
    ).toBeTruthy();
  });

  it("should renders an error message if there is an error during the fetch request", async () => {
    server.use(
      rest.get("*", (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );
    const { getByPlaceholderText, getByTestId, getByText } = renderWithClient(
      <MockComponent />
    );
    await act(async () => {
      fireEvent.changeText(
        getByPlaceholderText("Rechercher un film, une série..."),
        "some query"
      );
      fireEvent.press(getByTestId("search-btn"));
    });
    expect(
      getByText("Une erreur au niveau du serveur interne est survenue")
    ).toBeTruthy();
  });
});
