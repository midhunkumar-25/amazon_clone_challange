import { createSlice } from '@reduxjs/toolkit'

export const addressSlice = createSlice({
  name: 'address',
  initialState: {
    address: {}
  },
  reducers: {
    addaddress: (state, action) => {
      state.address =  action.payload
    },
    clearaddress: (state, action) => {
        state.address = {}
      },
  },
})

// Action creators are generated for each case reducer function
export const { addaddress,clearaddress } = addressSlice.actions

export default addressSlice.reducer