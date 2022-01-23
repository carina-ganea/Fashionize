import { configureStore, applyMiddleware } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import productReducer from './product.slice'
import userReducer from './user.slice'
// ...

export default configureStore({
  reducer: { 
      productReducer,
      userReducer
  },
});

