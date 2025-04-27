import Dashboard from '../../components/Dashboard/Dashboard';
import RecommendedList from '../../components/RecommendedList/RecommendedList';
import css from './RecommendedPage.module.css';

export default function RecommendedPage() {
  return (
    <div className={css.pageContainer}>
      <Dashboard />
      <RecommendedList />
    </div>
  );
}
