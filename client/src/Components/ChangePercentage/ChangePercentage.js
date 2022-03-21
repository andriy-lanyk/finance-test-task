import { useSelector } from 'react-redux';

import { tickersSelectors } from '../../Redux/tickers';

import style from './ChangePercentage.module.css';

import { pink } from '@mui/material/colors';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

export default function ChangePercentage({ tickerCode }) {
  const ticker = useSelector(state =>
    tickersSelectors.getTicker(state, tickerCode),
  );

  return (
    <div className={style.ChangePercentage}>
      <span className={style.ChangePercentage}>
        {ticker.isIncrease ? (
          <ArrowUpwardIcon color="success" fontSize="small" />
        ) : (
          <ArrowDownwardIcon sx={{ color: pink[500] }} fontSize="small" />
        )}
      </span>
      <p>{ticker.change_percent}%</p>
    </div>
  );
}
