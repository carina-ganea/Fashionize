import { createSlice } from '@reduxjs/toolkit'
import { RootState } from './utils';

export const productSlice = createSlice({
  name: 'product',
  initialState: {
    id: null,
    name: null,
    image: null,
    description:"nimic",
    price: null,
    liked: false,
    colours : [null,],
    type : ""
  },
  reducers: {
    updateProduct: (state, action) => {
        state.id = action.payload.id || state.id;
        state.name = action.payload.name || state.name;
        state.image = action.payload.image || state.image;
        state.price = action.payload.price || state.price;
        state.description = action.payload.description || state.description;
        state.liked = action.payload.liked || state.liked;
    },
    setLike: (state) => {
      state.liked = !state.liked;
    },
    setColours: (state, action) => {
      for( var i = 0; i < state.colours.length; i++){
        if( state.colours[i] === action.payload){
          state.colours[i] = state.colours[state.colours.length - 1];
          state.colours.pop();
          return;
        }
      }
      if( state.colours[0] == null){
        state.colours[0] = action.payload;
      } else {
        state.colours.push(action.payload);
      } 
    },
    setType : (state, action) => {
      state.type = action.payload;
    }
  }
  
})

// Action creators are generated for each case reducer function
export const { updateProduct, setLike, setColours, setType} = productSlice.actions

export const productSelector = (state: RootState) => {
  return state.productReducer;
}

export const productIdSelector = (state: RootState) => {
  return state.productReducer.id;
}

export const productColourSelector = (state: RootState) => {
  return state.productReducer.colours;
}



export default productSlice.reducer
