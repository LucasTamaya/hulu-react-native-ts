import { render } from "@testing-library/react-native";

import { AppWrapper } from "../../../../../Mocks/AppWrapper";
import { Card, TMDB_IMG_URL } from "../Card";
import { IMovieData } from "../../../../../interfaces";

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
    const { getByTestId } = render(<MockComponent mockData={mockData} />);
    expect(getByTestId("movieCard")).toBeTruthy();
  });

  it("should renders a movie poster if it exists", () => {
    const mockData: IMovieData = { id: 1, poster_path: "film_poster.jpg" };
    const { getByTestId } = render(<MockComponent mockData={mockData} />);
    expect(getByTestId("movieCardImg")).toBeTruthy();
    expect(getByTestId("movieCardImg").props.source.uri).toBe(
      `${TMDB_IMG_URL}film_poster.jpg`
    );
  });

  it("should not renders a movie poster if it doesn't exists", () => {
    const mockData: IMovieData = { id: 1 };
    const { queryByTestId } = render(<MockComponent mockData={mockData} />);
    expect(queryByTestId("movieCardImg")).toBeFalsy();
  });
});
