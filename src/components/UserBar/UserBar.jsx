import { useSelector } from 'react-redux';
import css from './UserBar.module.css';
import { selectUserName } from '../../redux/auth/selectors';
import { getFirstLetter } from '../../utils';
import { useMediaQuery } from 'react-responsive';

export default function UserBar() {
  const userName = useSelector(selectUserName);

  const isDesktop = useMediaQuery({ minWidth: 1280 });

  return (
    <div className={css.userBarContainer}>
      <div className={css.userAvatar}>{getFirstLetter(userName)}</div>
      {isDesktop && <p className={css.userName}>{userName}</p>}
    </div>
  );
}
