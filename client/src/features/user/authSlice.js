import { createSlice } from '@reduxjs/toolkit';
import Cookie from 'js-cookie';

const initialState = {
  loggedInUser: JSON.parse(localStorage.getItem('loggedInUser')) || null,
  isLogedIn: !!localStorage.getItem('loggedInUser'),
};


export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      localStorage.setItem('loggedInUser', JSON.stringify(action.payload));
      return {
        ...state,
        loggedInUser: action.payload,
        isLogedIn: true,
      };
    },
    logout: () => {
      localStorage.removeItem('loggedInUser');
      Cookie.remove('token');
      return initialState;
    },
    
    updateUser: (state, action) => {
      return {
        ...state,
        loggedInUser: action.payload,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout, updateUser } = authSlice.actions;

export default authSlice.reducer;
