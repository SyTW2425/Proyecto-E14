import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../../redux/store';
import { fetchBooks } from './booksAPI';

interface Book {
  id: string;
  titulo: string;
  autor: string;
  genero: string;
  fechaPublicacion: string;
}

interface BooksState {
  books: Book[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: BooksState = {
  books: [],
  status: 'idle',
};

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setBooks(state, action: PayloadAction<Book[]>) {
      state.books = action.payload;
    },
    setStatus(state, action: PayloadAction<BooksState['status']>) {
      state.status = action.payload;
    },
  },
});

export const { setBooks, setStatus } = booksSlice.actions;
export default booksSlice.reducer;

// Thunk para obtener los libros
export const fetchAllBooks = (): AppThunk => async (dispatch) => {
  dispatch(setStatus('loading'));
  try {
    const books = await fetchBooks();
    dispatch(setBooks(books));
    dispatch(setStatus('idle'));
  } catch (error) {
    console.error('Error al obtener libros:', error);
    dispatch(setStatus('failed'));
  }
};


//navbar.module.css
/* src/components/Navbar.css
.navbar {
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  width: 10cm !important;
  height: 100vh !important;
  background-color: #333 !important;
  display: flex !important;
  flex-direction: column !important;
  align-items: flex-start !important;
  padding-top: 20px !important;
  padding-left: 10px !important;
}

.navbar ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.navbar li {
  margin: 20px 0;
}

.navbar a {
  color: white;
  text-decoration: none;
  font-size: 18px;
  display: block;
  padding: 10px;
  width: 100%;
}

.navbar a:hover {
  background-color: #007bff;
  color: white;
} */


//navbar.tsx
// // src/components/Navbar.tsx
// import React from 'react';
// import { Link } from 'react-router-dom';

// const Navbar: React.FC = () => {
//   return (
//     <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-left" style={{ width: '10cm', position: 'absolute' }}>
//     <ul className="navbar-nav">
//       <li className="nav-item">
//         <a className="nav-link" href="#">Home</a>
//       </li>
//       <li className="nav-item">
//         <a className="nav-link" href="#">About</a>
//       </li>
//       <li className="nav-item">
//         <a className="nav-link" href="#">Services</a>
//       </li>
//       <li className="nav-item">
//         <a className="nav-link" href="#">Contact</a>
//       </li>
//     </ul>
//   </nav>
  
//   );
// };

// export default Navbar;
