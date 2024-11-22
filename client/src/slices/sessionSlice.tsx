import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the structure of the user object
interface UserObject {
  id: string;
  email: string;
  name?: string; // Opcional si es necesario
}

// Define the shape of the session state
interface SessionState {
  token: string | null;
  userObject: UserObject | null;
}

const initialState: SessionState = {
  token: null,
  userObject: null,
};

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    // Action to set the session
    setSession: (
      state,
      action: PayloadAction<{ token: string; userObject: UserObject }>
    ) => {
      state.token = action.payload.token;
      state.userObject = action.payload.userObject;
    },
    // Action to clear the session
    clearSession: (state) => {
      state.token = null;
      state.userObject = null;
    },
  },
});

export const { setSession, clearSession } = sessionSlice.actions;
export default sessionSlice.reducer;
