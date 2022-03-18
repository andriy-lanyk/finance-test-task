import { createSelector } from 'reselect';

export const getTickersList = state => Object.keys(state.tickers.tickers);

export const getTicker = (state, ticker) => state.tickers.tickers[ticker];

export const getFilter = state => state.tickers.filter;

const companiesAbbr = {
  AAPL: 'Apple',
  GOOGL: 'Alphabet',
  MSFT: 'Microsoft',
  AMZN: 'Amazon',
  FB: 'Facebook',
  TSLA: 'Tesla',
};

export const getFilteredTickers = createSelector(
  [getTickersList, getFilter],
  (tickers, filter) => {
    const normalizedFilter = filter.toLowerCase();
    return tickers.filter(name => {
      return companiesAbbr[name].toLowerCase().includes(normalizedFilter);
    });
  },
);
