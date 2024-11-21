import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import booksReducer from '../features/books/booksSlice';
import signUpReducer from '../features/signUpIn/signUpSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    books: booksReducer,
    signUp: signUpReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
