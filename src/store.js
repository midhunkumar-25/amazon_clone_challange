import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice';
import basketReducer from './basketSlice';
import homeproductReducer from './homeproductSlice'
import addressReducer from './addressSlice';

export default configureStore({
    reducer: {
        user:userReducer,
        basket:basketReducer,
        homeProducts:homeproductReducer,
        address:addressReducer
    },
  })