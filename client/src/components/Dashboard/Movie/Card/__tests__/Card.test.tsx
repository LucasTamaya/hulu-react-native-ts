import React from "react";
import { act, fireEvent } from "@testing-library/react-native";

import { AppWrapper } from "../../../../../Mocks/AppWrapper";
import { Card, TMDB_IMG_URL } from "../Card";
import { IMovieData } from "../../../../../interfaces";
import { renderWithClient } from "../../../../../tests/utils";

interface Props {
  mockData: IMovieData;
}

const MockComponent: React.FC<Props> = ({ mockData }) => {
  return (
    <AppWrapper>
      <Card data={mockData} />
    </AppWrapper>
  );
};

describe("MovieCard Component", () => {
  it("should renders the component", () => {
    const mockData: IMovieData = { id: 1, poster_path: "film_poster.jpg" };
    const { getByTestId } = renderWithClient(
      <MockComponent mockData={mockData} />
    );
    expect(getByTestId("movieCard")).toBeTruthy();
  });

  it("should renders a movie poster if it exists", () => {
    const mockData: IMovieData = { id: 1, poster_path: "film_poster.jpg" };
    const { getByTestId } = renderWithClient(
      <MockComponent mockData={mockData} />
    );
    expect(getByTestId("movieCardImg")).toBeTruthy();
    expect(getByTestId("movieCardImg").props.source.uri).toBe(
      `${TMDB_IMG_URL}film_poster.jpg`
    );
  });

  it("should not renders a movie poster if it doesn't exists", () => {
    const mockData: IMovieData = { id: 1 };
    const { queryByTestId } = renderWithClient(
      <MockComponent mockData={mockData} />
    );
    expect(queryByTestId("movieCardImg")).toBeFalsy();
  });

  it("should shows movie details if I click on a film poster", () => {
    const setStateMock = jest.fn();
    const useStateMock: any = (useState: any) => [useState, setStateMock];
    jest.spyOn(React, "useState").mockImplementation(useStateMock);

    const mockData: IMovieData = {
      id: 1,
      poster_path: "film_poster.jpg",
      first_air_date: "2012-10-21",
      original_title: "The film",
      vote_count: 450,
      overview: "A small overview",
    };
    const { getByTestId, getByText } = renderWithClient(
      <MockComponent mockData={mockData} />
    );
    fireEvent.press(getByTestId("detailsBtn"));

    expect(getByText("The film")).toBeTruthy();
    expect(getByText("2012-10-21")).toBeTruthy();
    expect(getByText("A small overview")).toBeTruthy();
    expect(getByText("450")).toBeTruthy();
  });
});
