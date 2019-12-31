import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr, checkProps } from "./../../test/testUtils";

import Input from "./Input";

// Factory function for Input component
// @returns ShallowWrapper

const setup = (secretWord = "party") => {
  return shallow(<Input secretWord={secretWord} />);
};

test("renders without crashing", () => {
  const wrapper = setup();
  const inputComponent = findByTestAttr(wrapper, "component-input");
  expect(inputComponent.length).toBe(1);
});

test("renders without warning with expected prop", () => {
  checkProps(Input, { secretWord: "party" });
});
