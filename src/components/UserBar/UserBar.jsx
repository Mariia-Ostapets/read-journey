import { useSelector } from 'react-redux';
import css from './UserBar.module.css';
import { selectUserName } from '../../redux/auth/selectors';
import { useDeviceType } from '../../hooks/useDeviceType';
import { getFirstLetter } from '../../utils';

export default function UserBar() {
  const deviceType = useDeviceType();

  const userName = useSelector(selectUserName);

  return (
    <div className={css.userBarContainer}>
      <div className={css.userAvatar}>{getFirstLetter(userName)}</div>
      {deviceType === 'desktop' && <p className={css.userName}>{userName}</p>}
    </div>
  );
}
