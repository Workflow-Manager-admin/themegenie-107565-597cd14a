import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ParallaxHome from "./pages/ParallaxHome";
import Home from "./pages/Home";
import CodeLab from "./pages/CodeLab";
import ContactUs from "./pages/ContactUs";
import "./App.css";

// PUBLIC_INTERFACE
function App() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <Router>
      <div className="App">
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>
        <Navbar />
        {/* Apply a global padding top to main content, matching the Navbar height */}
        <div className="app-main-content">
          <Routes>
            <Route path="/" element={<ParallaxHome />} />
            <Route path="/codelab" element={<CodeLab />} />
            <Route path="/contact" element={<ContactUs />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
