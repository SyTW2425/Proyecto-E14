import React from 'react';
import './App.css';
import BooksList from './features/books/booksList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Biblioteca de Libros</h1>
      </header>
      <main>
        {/* Aquí se muestra la lista de libros */}
        <BooksList />
      </main>
    </div>
  );
}

export default App;
