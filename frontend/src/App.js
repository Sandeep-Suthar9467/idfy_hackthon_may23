import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./dashboard";
import Home from "./home";
import Navbar from "./navbar";
import Upload from "./upload";

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="mt10">
        <Routes>
          <Route path="/" element={<Home />} exact />
          {/* <Route path="/home" element={<Home />} exact /> */}
          <Route path="/dashboard" element={<Dashboard />} exact />
          <Route path="/upload" element={<Upload />} exact />
          <Route path="*" element="No page found" exact={true} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
