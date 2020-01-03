import React from "react";
import { mount } from "enzyme";
import { findByTestAttr } from "./../test/testUtils";

import hookActions from "./actions/hookActions";
import App from "./App";

const mockGetSecretWord = jest.fn();

// Setup function for App component
// @returns {MountWrapper}

const setup = () => {
  mockGetSecretWord.mockClear();
  hookActions.getSecretWord = mockGetSecretWord;

  // use mount, because useEffect is not called on `shallow`
  return mount(<App />);
};

test("App renders without errors", () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, "component-app");
  expect(component.length).toBe(1);
});

describe("getSecretWord call", () => {
  test("getSecretWord gets called on App mount", () => {
    setup();

    //check to see if secret word was updated
    expect(mockGetSecretWord).toHaveBeenCalled();
  });
});
