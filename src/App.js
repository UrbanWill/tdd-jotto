import React from "react";
import "./App.css";

import Input from "./components/Input";

function App() {
  return (
    <div data-test="component-app">
      <h1>Jotto</h1>
      <Input secretWord={"party"} />
    </div>
  );
}

export default App;
