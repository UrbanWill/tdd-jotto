import React from "react";
import { shallow, mount } from "enzyme";
import { findByTestAttr, checkProps } from "./../../test/testUtils";

import Input from "./Input";
import languageContext from "./../contexts/languageContext";

// Factory function for Input component
// @params {object} testValues - context and props for this specific test
// @returns {React Wrapper} - wrapper for input and component provider

const setup = ({ language, secretWord }) => {
  language = language || "en";
  secretWord = secretWord || "party";

  return mount(
    <languageContext.Provider value={language}>
      <Input secretWord={secretWord} />
    </languageContext.Provider>
  );
};

describe("languagePicker", () => {
  test("correctly renders submit in english", () => {
    const wrapper = setup({ language: "en" });
    const inputComponent = findByTestAttr(wrapper, "component-input");
    expect(inputComponent.text()).toBe("Submit");
  });

  test("correctly renders submit in emoji", () => {
    const wrapper = setup({ language: "emoji" });
    const inputComponent = findByTestAttr(wrapper, "component-input");
    expect(inputComponent.text()).toBe("🚀");
  });
});

test("renders without crashing", () => {
  const wrapper = setup({});
  const inputComponent = findByTestAttr(wrapper, "component-input");
  expect(inputComponent.length).toBe(1);
});

test("renders without warning with expected prop", () => {
  checkProps(Input, { secretWord: "party" });
});

describe("state controlled input field", () => {
  let mockSetCurrentGuess = jest.fn();
  let wrapper;

  beforeEach(() => {
    mockSetCurrentGuess.mockClear();
    React.useState = jest.fn(() => ["", mockSetCurrentGuess]);
    wrapper = setup({});
  });

  test("state update with value of input box upon change", () => {
    const inputBox = findByTestAttr(wrapper, "input-box");

    const mockEvent = { target: { value: "train" } };
    inputBox.simulate("change", mockEvent);

    expect(mockSetCurrentGuess).toHaveBeenCalledWith("train");
  });

  test("setCurrentGuess is called with an empty string", () => {
    const submitButton = findByTestAttr(wrapper, "submit-button");

    submitButton.simulate("click", { preventDefault() {} });
    expect(mockSetCurrentGuess).toHaveBeenCalledWith("");
  });
});
