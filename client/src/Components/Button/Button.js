import Button from '@mui/material/Button';

function ButtonUniversal({ text, onClick, tickerCode }) {
  return (
    <Button
      variant="contained"
      size="small"
      name={tickerCode}
      onClick={onClick}
    >
      {text}
    </Button>
  );
}

export default ButtonUniversal;
