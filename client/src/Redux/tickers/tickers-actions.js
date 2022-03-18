import { createAction } from '@reduxjs/toolkit';

export const changeTicker = createAction('tickers/changeTicker', ticker => ({
  payload: {
    ...ticker,
    name: {
      AAPL: 'Apple',
      GOOGL: 'Alphabet',
      MSFT: 'Microsoft',
      AMZN: 'Amazon',
      FB: 'Facebook',
      TSLA: 'Tesla',
    }[ticker.ticker],
  },
}));

export const isChangeIncrease = createAction('tickers/isChangeIncrease');

export const filterTicker = createAction('tickers/filter');
