import React from "react";
import ReactDOM from "react-dom";
import Chips from "./Components/chips";
import "./styles.css";

function App() {
  return (
    <div className="App">
      <Chips />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
