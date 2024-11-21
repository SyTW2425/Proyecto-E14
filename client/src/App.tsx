import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import BooksList from './features/books/booksList';
import SignUpForm from './features/signUpIn/SignUpForm';
import SignInForm from './features/signUpIn/SignInForm';
import Navbar from './features/navbar/navbar';  

function App() {
  return (
    <Router>
      <div className="App">
        <main>
          <Routes>
            <Route path="/signup" element={<SignUpForm />} />
            <Route path="/signin" element={<SignInForm />} />
            <Route path="/" element={<BooksList />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
