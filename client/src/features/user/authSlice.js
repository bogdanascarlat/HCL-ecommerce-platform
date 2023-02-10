import { createSlice } from '@reduxjs/toolkit'
import Cookie from 'js-cookie'

const initialState = {
    logedInUser: null,
    isLogedIn: false
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      return {
        ...state,
        logedInUser: action.payload,
        isLogedIn: true
      }
    }, 
    logout: () => {
      Cookie.remove('token')
      return initialState
    },
    updateUser: (state, action) => {
      return{
        ...state,
        logedInUser: action.payload
      }
    }
  }
})

// Action creators are generated for each case reducer function
export const { login , logout, updateUser } = authSlice.actions

export default authSlice.reducer