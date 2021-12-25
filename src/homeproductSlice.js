import { createSlice } from '@reduxjs/toolkit'

export const homeproductSlice = createSlice({
  name: 'homeProducts',
  initialState: {
    homeProducts: []
  },
  reducers: {
    addtohome: (state, action) => {
      state.homeProducts = [...state.homeProducts, action.payload]
    },
    clearhome: (state) => {
        state.homeProducts = []
      },
  },
})

// Action creators are generated for each case reducer function
export const { addtohome,clearhome } = homeproductSlice.actions

export default homeproductSlice.reducer