import React from "react";
import { act, fireEvent, render } from "@testing-library/react-native";

import { AppWrapper } from "../../../../Mocks/AppWrapper";
import { SearchBar } from "../SearchBar";
import { server } from "../../../../Mocks/server";

beforeAll(() =>
  server.listen({
    onUnhandledRequest: "error",
  })
);

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
    const { getByTestId } = render(<MockComponent />);
    expect(getByTestId("searchBar")).toBeTruthy();
  });

  it("should renders a search button", () => {
    const { getByTestId } = render(<MockComponent />);
    expect(getByTestId("search-btn")).toBeTruthy();
  });

  it("should renders an input", () => {
    const { getByPlaceholderText } = render(<MockComponent />);
    expect(
      getByPlaceholderText("Rechercher un film, une série...")
    ).toBeTruthy();
  });

  it("should renders a movie card when I search for an existing movie", async () => {
    const { getByPlaceholderText, getByTestId } = render(<MockComponent />);
    await act(async () => {
      fireEvent.changeText(
        getByPlaceholderText("Rechercher un film, une série..."),
        "La soupe aux choux"
      );
      fireEvent.press(getByTestId("search-btn"));
    });
    expect(getByTestId("movieCard")).toBeTruthy();
    expect(getByTestId("movieCard-img")).toBeTruthy();
    expect(getByTestId("movieCard-img").props.source.uri).toBe(
      "https://image.tmdb.org/t/p/original/3Eym65PSArfU89O15Cct0JiaPHl.jpg"
    );
  });

  // it("should renders a loading animation during the fetch api", async () => {
  //   const { getByPlaceholderText, getByTestId } = render(<MockComponent />);
  //   await act(async () => {
  //     fireEvent.changeText(
  //       getByPlaceholderText("Rechercher un film, une série..."),
  //       "La soupe aux choux"
  //     );
  //     fireEvent.press(getByTestId("search-btn"));
  //   });
  // });

  // should renders an error message if I search for an non existing movie

  // should renders an error message if there is an error during the fetch api
});
