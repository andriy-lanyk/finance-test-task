import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import style from './Loader.module.css';

function CustomLoader() {
  return (
    <div className={style.loader__container}>
      <Loader
        type="Circles"
        color="rgb(25, 118, 210)"
        height={100}
        width={100}
      />
    </div>
  );
}

export default CustomLoader;
