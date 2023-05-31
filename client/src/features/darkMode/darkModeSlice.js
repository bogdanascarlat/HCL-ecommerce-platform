import { createSlice } from "@reduxjs/toolkit";

// Define the key for storing the dark mode state in localStorage
const localStorageKey = "darkModeState";

// Retrieve the saved state from localStorage if available
const savedState = localStorage.getItem(localStorageKey);

// Create the slice with the initial state based on the saved state or false if none exists
const darkModeSlice = createSlice({
  name: 'darkMode',
  initialState: savedState ? JSON.parse(savedState) : false,
  reducers: {
    toggleDarkMode: (state) => {
      const newState = !state;
      // Save the updated state in localStorage
      localStorage.setItem(localStorageKey, JSON.stringify(newState));
      return newState;
    },
  },
});

// Export the action creator and reducer
export const { toggleDarkMode } = darkModeSlice.actions;
export default darkModeSlice.reducer;
