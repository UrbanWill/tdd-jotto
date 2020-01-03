import React from "react";
import { mount } from "enzyme";
import { findByTestAttr } from "./../test/testUtils";

import hookActions from "./actions/hookActions";
import App from "./App";

const mockGetSecretWord = jest.fn();

// Setup function for App component
// @param {string} secretWord - desired secretWord state value for test
// @returns {MountWrapper}

const setup = (secretWord = "party") => {
  mockGetSecretWord.mockClear();
  hookActions.getSecretWord = mockGetSecretWord;

  const mockUserReducer = jest
    .fn()
    .mockReturnValue([{ secretWord }, jest.fn()]);

  React.useReducer = mockUserReducer;

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
  test("secretWord does not update on App update", () => {
    const wrapper = setup();
    mockGetSecretWord.mockClear();

    // wrapper.update doesn't trigger update
    // (issue forker from https://github.com/airbnb/enzyme/issues/2091)
    wrapper.setProps();

    expect(mockGetSecretWord).not.toHaveBeenCalled();
  });
});

describe("secretWord is not null", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup("party");
  });

  test("renders component-app when secretWord is not null", () => {
    const appComponent = findByTestAttr(wrapper, "component-app");

    expect(appComponent.exists()).toBe(true);
  });
  test("does not render spinner when secretWord is not null", () => {
    const spinnerComponent = findByTestAttr(wrapper, "spinner");

    expect(spinnerComponent.exists()).toBe(false);
  });
});

describe("secretWord is null", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup(null);
  });

  test("renders component-app when secretWord is null", () => {
    const appComponent = findByTestAttr(wrapper, "component-app");

    expect(appComponent.exists()).toBe(false);
  });
  test("renders spinner when secretWord is null", () => {
    const spinnerComponent = findByTestAttr(wrapper, "spinner");

    expect(spinnerComponent.exists()).toBe(true);
  });
});
