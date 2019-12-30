import checkPropTypes from "check-prop-types";

// Return node(s) with given data-test attribute.
// @param {ShallowWrapper} wrapper - Enzyme shallow wrapper.
// @param {string} val - Value data-test attribute for search.
// @returns {ShallowWrapper}

export const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test="${val}"]`);
};

export const checkProps = (component, conformingProps) => {
  const propError = checkPropTypes(
    component.propTypes,
    conformingProps,
    "props",
    component.name
  );
  expect(propError).toBeUndefined();
};
