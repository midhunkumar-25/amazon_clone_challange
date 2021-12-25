import { createSlice } from '@reduxjs/toolkit'

export const basketSlice = createSlice({
  name: 'basket',
  initialState: {
    basket: []
  },
  reducers: {
    addtobasket: (state, action) => {
      state.basket = [...state.basket, action.payload]
    },
    removefrombasket: (state, action) => {
        const index = state.basket.findIndex(
            (basketItem) => basketItem.id === action.payload
          );
          let newBasket = [...state.basket];
    
          if (index >= 0) {
            newBasket.splice(index, 1);
    
          } else {
            console.warn(
              `Cant remove product (id: ${action.payload}) as its not in basket!`
            )
          }
          state.basket =  newBasket
      },
    emptybasket: (state, action) => {
        state.basket = []
      },
  },
})

// Action creators are generated for each case reducer function
export const { addtobasket,removefrombasket,emptybasket } = basketSlice.actions

export default basketSlice.reducer