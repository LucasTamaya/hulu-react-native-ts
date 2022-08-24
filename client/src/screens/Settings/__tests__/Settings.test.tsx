import React from "react";
import { act, fireEvent, render } from "@testing-library/react-native";
import * as Navigation from "@react-navigation/native";

import { AppWrapper } from "../../../Mock/AppWrapper";
import { Settings } from "../Settings";

// bloque l'erreur: 'ReferenceError: You are trying to `import` a file after the Jest environment has been torn down.'
jest.useFakeTimers();

// const createTestProps = (props: Object) => ({
//   navigation: {
//     navigate: jest.fn(),
//   },
//   ...props,
// });

const MockComponent: React.FC = () => {
  return (
    <AppWrapper>
      <Settings />
    </AppWrapper>
  );
};

describe("Settings Screen", () => {
  it("should renders the screen", () => {
    const { getByTestId } = render(<MockComponent />);
    expect(getByTestId("settings")).toBeTruthy();
  });

  it("should renders 5 buttons", () => {
    const { getByTestId } = render(<MockComponent />);
    expect(getByTestId("logout-btn")).toBeTruthy();
    expect(getByTestId("changePassword-btn")).toBeTruthy();
    expect(getByTestId("legal-navBtn")).toBeTruthy();
    expect(getByTestId("linkedin-navBtn")).toBeTruthy();
    expect(getByTestId("github-navBtn")).toBeTruthy();
  });

  it("should open the LogoutPopUp when I click on the Logout button", async () => {
    const { getByTestId, queryByTestId } = render(<MockComponent />);
    await act(async () => {
      fireEvent.press(getByTestId("logout-btn"));
    });
    expect(queryByTestId("logoutPopup")).toBeTruthy();
  });

  it("should open the ChangePasswordPopUp when I click on the ChangePassword button", async () => {
    const { getByTestId, queryByTestId } = render(<MockComponent />);
    await act(async () => {
      fireEvent.press(getByTestId("changePassword-btn"));
    });
    expect(queryByTestId("changePasswordPopUp")).toBeTruthy();
  });

//   it("should renders a button to navigate to the Legal Screen", async () => {
//     let props: any;
//     beforeEach(() => {
//       props = createTestProps({});
//     });
//     const { getByTestId, debug } = render(<MockComponent />);
//     fireEvent.press(getByTestId("legal-navBtn"));
//     // await act(async () => {});
//     // expect(navigationMock.navigate).toHaveBeenCalledWith("Legal");
//     expect(props.navigation.navigate).toHaveBeenCalledWith("Legal");
//   });
});
