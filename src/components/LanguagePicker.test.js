import React from "react";
import { shallow } from "enzyme";

import { findByTestAttr, checkProps } from "../../test/testUtils";
import LanguagePicker from "./LanguagePicker";

const mockSetLanguage = jest.fn();

const setup = () => {
  return shallow(<LanguagePicker setLanguage={mockSetLanguage} />);
};

test("renders without errors", () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, "component-language-picker");
  expect(component.exists()).toBe(true);
});

test("does not throw warning with expected props", () => {
  checkProps(LanguagePicker, { setLanguage: jest.fn() });
});

test("renders non-zero language-icon", () => {
  const wrapper = setup();
  const languageIcons = findByTestAttr(wrapper, "language-icon");
  expect(languageIcons.length).toBeGreaterThan(0);
});

test("call setLanguage prop upon click", () => {
  const wrapper = setup();
  const languageIcons = findByTestAttr(wrapper, "language-icon");

  const firsIcon = languageIcons.first();
  firsIcon.simulate("click");

  expect(mockSetLanguage).toHaveBeenCalled();
});
