// App.js
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "./RegisterAndLogin/LoginPage";
import RegisterPage from "./RegisterAndLogin/RegisterPage";
import HomePage from "./RegisterAndLogin/HomePage";
import Calendar from "./HomePage/Calendar";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginDetails, setLoginDetails] = useState({});

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            <LoginPage
              onLogin={handleLogin}
              setLoginDetails={setLoginDetails}
            />
          }
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/home"
          element={
            isLoggedIn ? (
              <HomePage isLoggedIn={isLoggedIn} loginDetails={loginDetails} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/calendar"
          element={<Calendar loginDetails={loginDetails} />}
        />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
