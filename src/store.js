import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice';
import basketReducer from './basketSlice';
import homeproductReducer from './homeproductSlice'
import addressReducer from './addressSlice';
import  getDefaultMiddleware  from '@reduxjs/toolkit';
export default configureStore({
    reducer: {
        user:userReducer,
        basket:basketReducer,
        homeProducts:homeproductReducer,
        address:addressReducer
    },
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  })