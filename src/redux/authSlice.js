// redux/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  accessToken: null,
  expiresAt: null,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      console.log("Đang lưu user vào redux:", action.payload)

      const { accessToken, expiresAt, user } = action.payload;
      state.accessToken = accessToken;
      state.expiresAt = expiresAt;
      state.user = user;
    },
    logout: (state) => {
      state.accessToken = null;
      state.expiresAt = null;
      state.user = null;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;

export default authSlice.reducer;
