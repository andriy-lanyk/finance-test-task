import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { tickerOperations, tickersSelectors } from '../../Redux/tickers';
import style from './ModalWindow.module.css';

import ChangePercentage from '../ChangePercentage';

function ModalWindow({ tickerCode, onClose }) {
  const ticker = useSelector(state =>
    tickersSelectors.getTicker(state, tickerCode),
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleKeyDown = ({ code }) => {
    code === 'Escape' && onClose();
  };

  const onBackdropClick = ({ target, currentTarget }) => {
    target === currentTarget && onClose();
  };

  const getNormilizedTime = data => {
    const arr = data.split('');
    const time = data.slice(arr.indexOf('T') + 1, arr.indexOf('T') + 9);
    const date = data.slice(0, arr.indexOf('T')).split('-').reverse().join('-');

    return (
      <>
        <p>{time} </p>
        <p>{date}</p>
      </>
    );
  };

  return (
    <div className={style.Modal__backdrop} onClick={onBackdropClick}>
      <div
        className={`${style.Modal__content} ${
          tickerOperations.isIncrease
            ? style.Modal__content_increase
            : style.Modal__content_decrease
        }`}
      >
        <h4 className={style.Modal__title}>{ticker.name}</h4>
        <div className={style.Modal__wrapper}>
          <div className={style.Modal__box}>{ticker.price}&#36;</div>
          <div className={style.Modal__box}>
            {ticker.isIncrease ? '+' : '-'}
            {ticker.change}&#36;
          </div>
          <div className={style.Modal__box}>
            <ChangePercentage tickerCode={tickerCode} />
          </div>
        </div>
        <div className={style.Modal__wrapper}>
          <div>
            <p className={style.Modal__text}>Дивиденди:</p>
            <div className={style.Modal__box + ' ' + style.Modal__elem}>
              {ticker.dividend}%
            </div>
          </div>
          <div>
            <p className={style.Modal__text}>Доход:</p>
            <div className={style.Modal__box + ' ' + style.Modal__elem}>
              {ticker.yield}%
            </div>
          </div>
          <div>
            <p className={style.Modal__text}>Последняя сделка:</p>
            <div
              className={
                style.Modal__box +
                ' ' +
                style.Modal__elem +
                ' ' +
                style.Modal__elem_minSize
              }
            >
              {getNormilizedTime(ticker.last_trade_time)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalWindow;
