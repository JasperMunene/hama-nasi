import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./app/login/login";  // Corrected path
import Signup from "./app/signup/Signup";  // Corrected path
import Home from "./app/page";  // Home page import

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} /> {/* Home Page */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
            </Routes>
        </Router>
    );
}

export default App;