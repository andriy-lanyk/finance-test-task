import { useSelector, useDispatch } from 'react-redux';
import { tickersActions } from '../../Redux/tickers';
import { tickersSelectors } from '../../Redux/tickers';

import TextField from '@mui/material/TextField';

const Filter = () => {
  const filter = useSelector(tickersSelectors.getFilter);
  const tickers = useSelector(tickersSelectors.getTickersList);
  const dispatch = useDispatch();

  const handleChange = e => {
    dispatch(tickersActions.filterTicker(e.target.value));
  };

  return tickers.length !== 0 ? (
    <TextField
      sx={{ margin: '20px' }}
      size="small"
      label="Find ticker by name"
      type="text"
      name="Find ticker"
      value={filter}
      onChange={handleChange}
    />
  ) : (
    <TextField
      sx={{ margin: '20px' }}
      disabled
      size="small"
      label="Find ticker by name"
      type="text"
      name="Find ticker"
      value={filter}
      onChange={handleChange}
    />
  );
};

export default Filter;
