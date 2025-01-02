import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./Pages/SignUp";
import SignIn from "./Pages/SignIn";
import LandingPage from "./Pages/LandingPage";
import { MainPage } from "./Pages/MainPage";
//import BooksList from "./components/books/booksList";
//import SignUpForm from "./features/signUpIn/SignUpForm";
//import SignInForm from "./features/signUpIn/SignInForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/main" element={<MainPage />} />
        {/*<Route path="/sign-up" element={<h1>Sign Up</h1>} /> */}
        {/*<Route path="/sign-in" element={<h1>Sign In</h1>} /> */}
      </Routes>
    </Router>
  );
}

export default App;
