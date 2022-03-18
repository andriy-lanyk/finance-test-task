import { useState } from 'react';
import socket from '../../Socket';

import style from './ChangeIntervalForm.module.css';

import Button from '../Button';

export default function ChangeIntervalForm() {
  const [inputValue, setInputValue] = useState('');
  const [wrongNumber, setWrongNumber] = useState(false);

  const onInputChange = e => {
    setInputValue(e.currentTarget.value);
  };

  const onSubmit = e => {
    e.preventDefault();
    if (inputValue < 1) {
      setInputValue('');
      setWrongNumber(true);
      setTimeout(() => setWrongNumber(false), 1000);
      return;
    }
    socket.emit('changeInterval', inputValue * 1000);
    setInputValue('');
  };

  return (
    <form className={style.ChangeIntervalForm}>
      <p className={style.ChangeIntervalForm__text}>
        Укажите время интервала изменения данных в секундах:
      </p>
      <input
        className={wrongNumber ? style.ChangeIntervalForm__input_error : ''}
        type="number"
        min="1"
        value={inputValue}
        onChange={onInputChange}
      />
      <Button text={'Изменить'} onClick={onSubmit} />
    </form>
  );
}
