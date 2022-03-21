import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import { tickerOperations } from './Redux/tickers';

import { ThemeProvider, createTheme } from '@mui/material/styles';

import './App.css';
import TickersView from './Views/TickersView';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(tickerOperations.getDataSocket());
  }, [dispatch]);

  const themeLight = createTheme({
    palette: {
      background: {
        default: 'rgba(169, 175, 255, 0.3)',
      },
    },
  });

  return (
    <ThemeProvider theme={themeLight}>
      <TickersView />
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </ThemeProvider>
  );
}

export default App;
