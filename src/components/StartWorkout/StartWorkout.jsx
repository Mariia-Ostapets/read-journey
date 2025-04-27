import { Link } from 'react-router-dom';
import css from './StartWorkout.module.css';

export default function StartWorkout() {
  return (
    <div className={css.startWorkoutContainer}>
      <h2 className={css.startWorkoutTitle}>Start your workout</h2>
      <ul className={css.startWorkoutList}>
        <li className={css.startWorkoutItem}>
          <div className={css.startWorkoutItemNumber}>1</div>
          <p className={css.startWorkoutItemText}>
            Create a personal library:{' '}
            <span className={css.startWorkoutItemAccentText}>
              add the books you intend to read to it.
            </span>
          </p>
        </li>
        <li className={css.startWorkoutItem}>
          <div className={css.startWorkoutItemNumber}>2</div>
          <p className={css.startWorkoutItemText}>
            Create your first workout:{' '}
            <span className={css.startWorkoutItemAccentText}>
              define a goal, choose a period, start training.
            </span>
          </p>
        </li>
      </ul>
      <Link to="/library" className={css.linkText}>
        My library{' '}
        <svg width={24} height={24}>
          <use href="/sprite.svg#icon-arrow-right"></use>
        </svg>
      </Link>
    </div>
  );
}
