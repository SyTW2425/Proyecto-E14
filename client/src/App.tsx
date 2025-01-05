import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./Pages/SignUp";
import SignIn from "./Pages/SignIn";
import LandingPage from "./Pages/LandingPage";
import BooksPage from "./Pages/BooksPage";
import UserLibraryPage from "./Pages/UserLibraryPage";
import { BookProgressPage } from "./Pages/BookProgressPage";
import UserProfilePage from "./Pages/UserProfilePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/books" element={<BooksPage />} />
        <Route path="/library" element={<UserLibraryPage />} />
        <Route path="/library/:id" element={<BookProgressPage />} />
        <Route path="/profile" element={<UserProfilePage />} />
      </Routes>
    </Router>
  );
}

export default App;
