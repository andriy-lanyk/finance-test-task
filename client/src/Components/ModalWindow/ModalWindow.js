import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useSelector } from 'react-redux';
import moment from 'moment';

import { tickersSelectors } from '../../Redux/tickers';
import style from './ModalWindow.module.css';

import ChangePercentage from '../ChangePercentage';
import Button from '../Button';

const modalRoot = document.querySelector('#modal-root');

function ModalWindow({ tickerCode, onClose }) {
  const ticker = useSelector(state =>
    tickersSelectors.getTicker(state, tickerCode),
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  function handleKeyDown(e) {
    if (e.code === 'Escape') {
      onClose();
    }
  }

  function handleClickOnBackdrop(e) {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

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

  return createPortal(
    <div className={style.Modal__backdrop} onClick={handleClickOnBackdrop}>
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
        <Button
          text="Close"
          onClick={() => onClose()}
          tickerCode={tickerCode}
        />
      </div>
    </div>,
    modalRoot,
  );
}

export default ModalWindow;
