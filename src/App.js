import React from "react";
import "./App.css";

import Input from "./components/Input";
import hookActions from "./actions/hookActions";

// reducer to update state
// @param state {object} - existing state, called automatically by  dispatch
// @param action {object} - contains "type" and "payload" properties for the state update
//                   for example: {type: "setSecretWord", payload: "party"}
// @return {object} - new state

function reducer(state, action) {
  switch (action.type) {
    case "setSecretWord":
      return { ...state, secretWord: action.payload };
    default:
      throw new Error(`invalid action type: ${action.type}`);
  }
}

function App() {
  const [state, dispatch] = React.useReducer(reducer, { secretWord: null });

  const setSecretWord = secretWord =>
    dispatch({ type: "setSecretWord", payload: secretWord });

  React.useEffect(() => {
    hookActions.getSecretWord(setSecretWord);
  }, []);

  return (
    <div data-test="component-app">
      <h1>Jotto</h1>
      <Input secretWord={"party"} />
    </div>
  );
}

export default App;
