import { configureStore } from '@reduxjs/toolkit';
import appReducer from "./app/appSlice";
import streamReducer from './stream/streamSlice';
export const store = configureStore({
  reducer: {
    app:appReducer,
    stream:streamReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch