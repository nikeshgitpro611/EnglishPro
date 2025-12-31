import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  user: null,
};

// Helper function to determine role based on email
const getRoleByEmail = (email) => {
  if (email === 'nikeshkumarsingh0987@gmail.com') {
    return 'admin';
  }
  return null;
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action) {
      state.isAuthenticated = true;
      const userData = action.payload;
      // Set role based on email if not already provided
      state.user = {
        ...userData,
        role: userData.role || getRoleByEmail(userData.email),
      };
    },
    clearUser(state) {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
