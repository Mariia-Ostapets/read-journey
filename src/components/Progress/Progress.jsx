import NoResults from '../ui/NoResults/NoResults';
import css from './Progress.module.css';

export default function Progress() {
  return (
    <div className={css.progressContainer}>
      <h2 className={css.progressTitle}>Progress</h2>
      <NoResults />
    </div>
  );
}
