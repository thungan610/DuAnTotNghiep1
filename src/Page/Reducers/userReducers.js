import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    email: '',
    password: '',
    rememberAccount: false,
    userData: null,
    userId: null
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
    setUserId: (state, action) => { 
      state.userId = action.payload;
    },
    clearUser: (state) => {
      state.userData = null;
      state.email = '';
      state.password = '';
      state.userId = null; 
    },
  },
});

export const { setUser, setEmail, setPassword, setRememberAccount, setUserId, clearUser } = userSlice.actions;

export default userSlice.reducer;
