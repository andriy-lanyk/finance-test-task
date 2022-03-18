import { createReducer, combineReducers } from '@reduxjs/toolkit';
import {
  changeTicker,
  isChangeIncrease,
  filterTicker,
} from './tickers-actions';

const tickers = createReducer(
  {},
  {
    [changeTicker]: (state, { payload }) => ({
      ...state,
      [payload.ticker]: {
        ...state[payload.ticker],
        ...payload,
      },
    }),
    [isChangeIncrease]: (state, { payload: { ticker, isIncrease } }) => ({
      ...state,
      [ticker]: {
        ...state[ticker],
        isIncrease,
      },
    }),
  },
);

const filter = createReducer('', {
  [filterTicker]: (_, { payload }) => payload,
});

export default combineReducers({
  tickers,
  filter,
});
