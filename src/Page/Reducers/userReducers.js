import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    email: '',
    password: '',
    rememberAccount: false,
    userData: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.userData = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setRememberAccount: (state, action) => {
      state.rememberAccount = action.payload;
    },
    clearUser: (state) => {
      state.userData = null;
      state.email = '';
      state.password = '';
    },
  },
});

export const { setUser, setEmail, setPassword, setRememberAccount, clearUser } = userSlice.actions;

export default userSlice.reducer;
