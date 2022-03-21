import { useState } from 'react';
import { useSelector } from 'react-redux';

import { tickersSelectors } from '../../Redux/tickers';
import style from './TickersList.module.css';

import TickerItem from '../TickerItem';
import ModalWindow from '../ModalWindow';

function TickersList() {
  const [tickerModalName, setTickerModalName] = useState(null);

  const tickersList = useSelector(tickersSelectors.getFilteredTickers);

  const onButtonClick = e => {
    setTickerModalName(e.currentTarget.name);
  };

  const onCloseModal = () => {
    setTickerModalName(null);
  };

  return (
    <>
      {tickerModalName && (
        <ModalWindow tickerCode={tickerModalName} onClose={onCloseModal} />
      )}
      <div className={style.tickers__container}>
        <ul>
          {tickersList.length < 1 ? (
            <li className={style.tickers__nothingFound}>
              We don't have a company with a suitable name
            </li>
          ) : (
            tickersList?.map(ticker => (
              <TickerItem
                key={ticker}
                tickerCode={ticker}
                onButtonClick={onButtonClick}
              />
            ))
          )}
        </ul>
      </div>
    </>
  );
}

export default TickersList;
