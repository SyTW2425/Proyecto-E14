import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SignUpState {
  status: 'idle' | 'loading' | 'failed';
  error: string | null;
}

const initialState: SignUpState = {
  status: 'idle',
  error: null,
};

const signUpSlice = createSlice({
  name: 'signUp',
  initialState,
  reducers: {
    signUp: (state, action: PayloadAction<{ fullName: string; email: string; username: string; password: string; confirmPassword: string }>) => {
      state.status = 'loading';
    },
    signUpSuccess: (state) => {
      state.status = 'idle';
      state.error = null;
    },
    signUpFailure: (state, action: PayloadAction<string>) => {
      state.status = 'failed';
      state.error = action.payload;
    },
  },
});

export const { signUp, signUpSuccess, signUpFailure } = signUpSlice.actions;
export default signUpSlice.reducer;
