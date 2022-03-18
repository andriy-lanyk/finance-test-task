import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { tickerOperations } from './Redux/tickers';

import './App.css';
import TickersView from './Views/TickersView';

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(tickerOperations.getDataSocket());
  }, [dispatch]);

  return <TickersView />;
}
