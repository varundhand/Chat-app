import { createSlice } from '@reduxjs/toolkit'

// Checking if authentication Id exists in localStorage
// const isAuthenticated = !!localStorage.getItem('authId') // Double Logical Not gives the actual boolean representation of any value i.e. a truthy value remains true, and a falsy value remains false.

//TODO: WHEN I CLICK REFRESH THE AUTHSLICE RESETS MAKING ME UNABLE TO PERSIST THE DATA 
const initialState = {
  // isAuthenticated: isAuthenticated,
  isAuthenticated: localStorage.getItem('isAuthenticated') === 'true',
  accountDetails: JSON.parse(localStorage.getItem('accountDetails')),
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state,action) => {
      state.isAuthenticated = true;
      state.accountDetails = action.payload
      localStorage.setItem('isAuthenticated', true)
      localStorage.setItem('accountDetails', JSON.stringify(action.payload))
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.accountDetails = null
      localStorage.setItem('isAuthenticated', false);
      localStorage.removeItem('accountDetails');
    },
  },
})


export const { login, logout  } = authSlice.actions

export default authSlice.reducer