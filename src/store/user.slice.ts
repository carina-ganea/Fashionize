import { createSlice } from '@reduxjs/toolkit'
import { RootState } from './utils';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    email: '',
    firstName: '',
    lastName: '',
    id: window.sessionStorage.getItem("id"),
    cart: <any>[]
  },
  reducers: {
    updateProfile: (state, action) => {
        state.email = action.payload.email || state.email;
        state.firstName = action.payload.firstName || state.firstName;
        state.lastName = action.payload.lastName || state.lastName;
        state.id = action.payload.id || state.id;
    },
    addToCart: ( state, action ) => {
      state.cart.push(action.payload)
    },
    removeFromCart: (state, action) => {
      state.cart.pop(action.payload)
    }
  }
})

// Action creators are generated for each case reducer function
export const { updateProfile, addToCart, removeFromCart } = userSlice.actions

export const isAuthenticatedSelector = (state: RootState) => {
  return !!state.userReducer.id;
}

export const userSelector = (state: RootState) => {
  return state.userReducer;
}

export const userIdSelector = (state: RootState) => {
  return state.userReducer.id;
}

export const userCartSelector = (state: RootState) => {
  return state.userReducer.cart;
}

export default userSlice.reducer
