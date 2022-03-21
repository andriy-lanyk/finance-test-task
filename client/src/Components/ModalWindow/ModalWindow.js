import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';

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
    const date = moment(data, moment.ISO_8601).format('DD.MM.YYYY');
    const time = moment(data, moment.ISO_8601).format('LTS');

    return (
      <>
        <p className={style.Modal__elem_minSize}>{time} </p>
        <p className={style.Modal__elem_minSize}>{date}</p>
      </>
    );
  };

  return (
    <div className={style.Modal__backdrop} onClick={onBackdropClick}>
      <div
        className={`${style.Modal__content} ${
          ticker.isIncrease
            ? style.Modal__content__increase
            : style.Modal__content__decrease
        }`}
      >
        <h4 className={style.Modal__title}>{ticker.name}</h4>
        <ul className={style.Modal__container}>
          <li className={style.Modal__container__item}>
            <p className={style.Modal__text}>Price:</p>
            <div className={style.Modal__box}>{ticker.price}&#36;</div>
          </li>
          <li className={style.Modal__container__item}>
            <p className={style.Modal__text}>Change:</p>
            <div className={style.Modal__box}>
              {ticker.isIncrease ? '+' : '-'}
              {ticker.change}&#36;
            </div>
          </li>
          <li className={style.Modal__container__item}>
            <p className={style.Modal__text}>Change in percent:</p>
            <div className={style.Modal__box}>
              <ChangePercentage tickerCode={tickerCode} />
            </div>
          </li>
          <li className={style.Modal__container__item}>
            <p className={style.Modal__text}>Dividends:</p>
            <div className={style.Modal__box}>{ticker.dividend}%</div>
          </li>
          <li className={style.Modal__container__item}>
            <p className={style.Modal__text}>Revenue:</p>
            <div className={style.Modal__box}>{ticker.yield}%</div>
          </li>
          <li className={style.Modal__container__item}>
            <p className={style.Modal__text}>Last trade:</p>
            <div className={`${style.Modal__box} ${style.Modal__box__time}`}>
              {getNormilizedTime(ticker.last_trade_time)}
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ModalWindow;
