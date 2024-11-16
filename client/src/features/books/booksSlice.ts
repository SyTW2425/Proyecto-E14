import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../../app/store';
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
