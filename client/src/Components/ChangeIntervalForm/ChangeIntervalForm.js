import { useState } from 'react';
import { toast } from 'react-toastify';
import TextField from '@mui/material/TextField';

import socket from '../../Socket';

import style from './ChangeIntervalForm.module.css';

import Button from '../Button';

function ChangeIntervalForm() {
  const [inputValue, setInputValue] = useState('');
  const [wrongNumber, setWrongNumber] = useState(false);

  const onInputChange = e => {
    setInputValue(e.currentTarget.value);
  };

  const onSubmit = e => {
    e.preventDefault();
    if (inputValue < 1 || !Number(inputValue)) {
      setWrongNumber(true);
      setTimeout(() => {
        setWrongNumber(false);
        setInputValue('');
      }, 2000);
      return;
    }
    socket.emit('changeInterval', inputValue * 1000);
    toast.success(`You changed fetch interval time for ${inputValue} seconds`, {
      theme: 'colored',
      autoClose: 2500,
    });
    setInputValue('');
  };

  return (
    <form className={style.ChangeIntervalForm}>
      <p className={style.ChangeIntervalForm__text}>
        You can specify the data change interval time in seconds:
      </p>
      <div className={style.input__container}>
        {wrongNumber ? (
          <TextField
            error
            id="outlined-error-helper-text"
            label="Enter number"
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            size="small"
            helperText="Incorrect entry"
            value={inputValue}
            onChange={onInputChange}
          />
        ) : (
          <TextField
            id="outlined-number"
            label="Enter number"
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            size="small"
            helperText=" "
            value={inputValue}
            onChange={onInputChange}
          />
        )}
      </div>

      <Button text={'Change'} onClick={onSubmit} />
    </form>
  );
}

export default ChangeIntervalForm;
