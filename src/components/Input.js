import React from "react";
import PropTypes from "prop-types";

function Input({ secretWord }) {
  return (
    <div data-test="component-input">
      <h3>Input component</h3>
    </div>
  );
}

Input.propTypes = {
  secretWord: PropTypes.string.isRequired
};

export default Input;
