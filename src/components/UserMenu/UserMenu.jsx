import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/auth/operations';
import { selectUser } from '../../redux/auth/selectors';
import s from './UserMenu.module.css';

const UserMenu = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  return (
    <div className={s.header}>
      <p className={s.username}>Welcome, {user.name}</p>
      <button
        className={s.logout}
        type="button"
        onClick={() => dispatch(logout())}
      >
        Logout
      </button>
    </div>
  );
};

export default UserMenu;
