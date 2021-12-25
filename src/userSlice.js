import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null
  },
  reducers: {
    adduser: (state, action) => {
      state.user = action.payload
    },
    clearuser:(state)=>{
      state.user = null
    }
  },
})

// Action creators are generated for each case reducer function
export const { adduser,clearuser } = userSlice.actions

export default userSlice.reducer