import React from "react";

// Function component for congratulatory message.
// @function
// @param {object} props - React props.
// @returns {JSX>Element} - Rendered component (or null if "success" prop is null?)

function Congrats(props) {
  if (props.success) {
    return (
      <div data-test="component-congrats">
        <span data-test="congrats-message">
          Congratulations! You guessed the word!
        </span>
      </div>
    );
  } else {
    return <div data-test="component-congrats" />;
  }
}

export default Congrats;