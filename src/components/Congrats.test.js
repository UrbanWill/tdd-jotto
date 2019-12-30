import React from "react";
import Enzyme, { shallow } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";

import { findByTestAttr } from "../../test/testUtils";
import Congrats from "./Congrats";

// Factory function to create ShallowWrapper for Congrats component.
// @function setup
// @param {object} props - Component props specific to this setup.
// @return {ShallowWrapper}

const setUp = (props = {}) => {
  return shallow(<Congrats {...props} />);
};

Enzyme.configure({ adapter: new EnzymeAdapter() });

test("renders without error", () => {
  const wrapper = setUp();
  const component = findByTestAttr(wrapper, "component-congrats");
  expect(component.length).toBe(1);
});

test("renders no text when `success` prop is false", () => {
  const wrapper = setUp({ success: false });
  const component = findByTestAttr(wrapper, "component-congrats");
  expect(component.text()).toBe("");
});

test("renders non-empty congrats message when `success` props is true", () => {
  const wrapper = setUp({ success: true });
  const message = findByTestAttr(wrapper, "congrats-message");
  expect(message.text().length).not.toBe(0);
});
