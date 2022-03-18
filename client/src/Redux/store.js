import { configureStore } from '@reduxjs/toolkit';
import tickers from './tickers/tickers-reducers';

const store = configureStore({
  reducer: {
    tickers,
  },
  devTools: process.env.NODE_ENV === 'development',
});

export default store;
