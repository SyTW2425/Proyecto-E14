import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "../slices/counter/counterSlice";
import booksReducer from "../slices/books/booksSlice";
//import signUpReducer from "../components/signUpIn/signUpSlice";
import sessionReducer from "../slices/sessionSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    books: booksReducer,
    session: sessionReducer,
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

export default store;
