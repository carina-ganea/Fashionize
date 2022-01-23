import { configureStore } from '@reduxjs/toolkit'
import productReducer from './product.slice'
import userReducer from './user.slice'

export default configureStore({
  reducer: { 
      productReducer,
      userReducer
  },
});

