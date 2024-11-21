import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SignInState {
  username: string;
  password: string;
}

const initialState: SignInState = {
  username: '',
  password: '',
};

const signInSlice = createSlice({
  name: 'signIn',
  initialState,
  reducers: {
    signIn: (state, action: PayloadAction<SignInState>) => {
      const { username, password } = action.payload;
      // Logic for handling sign-in (e.g., API request, saving user info)
      console.log('Signing in with:', { username, password });
    },
  },
});

export const { signIn } = signInSlice.actions;
export default signInSlice.reducer;
