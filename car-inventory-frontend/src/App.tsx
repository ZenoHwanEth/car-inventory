import React from "react";
import NavigationBar from "./component/navigation";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./component/home";

function App() {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
