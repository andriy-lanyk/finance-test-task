import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { tickersSelectors, tickersActions } from '../../Redux/tickers';
import style from './TickerItem.module.css';

import ChangePercentage from '../ChangePercentage';
import Button from '../Button';

function TickerItem({ tickerCode, onButtonClick }) {
  const [currentPrice, setCurrentPrice] = useState(null);

  const dispatch = useDispatch();

  const ticker = useSelector(state =>
    tickersSelectors.getTicker(state, tickerCode),
  );

  useEffect(() => {
    if (currentPrice === null) {
      setCurrentPrice(ticker.price);
      return;
    }
    currentPrice > ticker.price
      ? dispatch(
          tickersActions.isChangeIncrease({
            ticker: tickerCode,
            isIncrease: false,
          }),
        )
      : dispatch(
          tickersActions.isChangeIncrease({
            ticker: tickerCode,
            isIncrease: true,
          }),
        );
    setCurrentPrice(ticker.price);
  }, [ticker.price]);

  return (
    <div
      className={`${style.tickerItem__container} ${
        ticker.isIncrease
          ? style.tickerItem__increase
          : style.tickerItem__decrease
      }`}
    >
      <h4 className={style.tickerItem__name}>{ticker.name}</h4>
      <div className={style.tickerItem__elem}>
        <p>{ticker.price}&#36;</p>
      </div>
      <div className={style.tickerItem__elem}>
        <p>
          {ticker.isIncrease ? '+' : '-'}
          {ticker.change}&#36;
        </p>
      </div>
      <div className={style.TickerPrice__elem}>
        <ChangePercentage tickerCode={tickerCode} />
      </div>
      <Button
        text={'Details'}
        tickerCode={tickerCode}
        onClick={onButtonClick}
      />
    </div>
  );
}

export default TickerItem;
