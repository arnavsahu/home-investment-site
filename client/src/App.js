import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Model from "./Pages/Model";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Model />} />
      </Routes>
    </Router>
  );
}

export default App;
