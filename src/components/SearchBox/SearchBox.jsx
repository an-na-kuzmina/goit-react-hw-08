import s from './SearchBox.module.css';
import { useDispatch } from 'react-redux';
import { changeFilter } from '../../redux/filtersSlice';

const SearchBox = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <label className={s.label}>
        <span>Find contacts by name</span>
        <input
          className={s.input}
          type="text"
          name="search"
          onChange={e => dispatch(changeFilter(e.target.value))}
        />
      </label>
    </div>
  );
};

export default SearchBox;
