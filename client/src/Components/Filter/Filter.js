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
      margin="none"
      size="small"
      label="Find ticker by name"
      type="text"
      name="Find ticker"
      value={filter}
      onChange={handleChange}
    />
  ) : (
    <TextField
      disabled
      margin="none"
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
