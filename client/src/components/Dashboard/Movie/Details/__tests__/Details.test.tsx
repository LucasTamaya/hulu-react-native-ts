import { fireEvent, render } from "@testing-library/react-native";

import { AppWrapper } from "../../../../../tests/AppWrapper";
import { IMovieData } from "../../../../../interfaces";
import { Details } from "../Details";

const setSaveMock = jest.fn();

const mockData: IMovieData = {
  id: 1,
  first_air_date: "2019-10-21",
  original_title: "The Super Film",
  overview: "This is the overview",
  vote_count: 560,
};

interface Props {
  save: boolean;
}

const MockComponent: React.FC<Props> = ({ save }) => {
  return (
    <AppWrapper>
      <Details data={mockData} save={save} setSave={setSaveMock} />
    </AppWrapper>
  );
};

describe("MovieDetails Component", () => {
  it("should renders the component", () => {
    const { getByText } = render(<MockComponent save={true} />);
    expect(getByText(/The Super Film/i)).toBeTruthy();
    expect(getByText(/This is the overview/i)).toBeTruthy();
    expect(getByText(/560/i)).toBeTruthy();
    expect(getByText(/2019-10-21/i)).toBeTruthy();
  });

  it("should renders a heart filled icon if the film is saved", () => {
    const { getByTestId } = render(<MockComponent save={true} />);
    expect(getByTestId("heartIcon")).toBeTruthy();
  });

  it("should renders an empty heart icon if the film is not saved", () => {
    const { getByTestId } = render(<MockComponent save={false} />);
    expect(getByTestId("emptyHeartIcon")).toBeTruthy();
  });

  it("should save the film if it hasn't been saved yet and I click on the save button", () => {
    const { getByTestId } = render(<MockComponent save={false} />);
    fireEvent.press(getByTestId("saveBtn"));
    expect(setSaveMock).toHaveBeenCalledWith(true);
  });

  it("should unsave the film if it has already been saved and I click on the save button", () => {
    const { getByTestId } = render(<MockComponent save={true} />);
    fireEvent.press(getByTestId("saveBtn"));
    expect(setSaveMock).toHaveBeenCalledWith(false);
  });
});
