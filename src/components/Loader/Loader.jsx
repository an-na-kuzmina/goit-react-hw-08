import { ThreeCircles } from 'react-loader-spinner';
import s from './Loader.module.css';
const Loader = () => (
  <div className={s.load}>
    <ThreeCircles
      visible={true}
      height="100"
      width="100"
      color="#8d2fff"
      ariaLabel="three-circles-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
  </div>
);

export default Loader;
