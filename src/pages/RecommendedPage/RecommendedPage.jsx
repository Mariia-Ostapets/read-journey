import Dashboard from '../../components/Dashboard/Dashboard';
import RecommendedList from '../../components/RecommendedList/RecommendedList';
import DocumentTitle from '../../components/ui/DocumentTitle';
import css from './RecommendedPage.module.css';

export default function RecommendedPage() {
  return (
    <>
      <DocumentTitle>ReadJourney — Recommended</DocumentTitle>
      <div className={css.pageContainer}>
        <Dashboard />
        <RecommendedList />
      </div>
    </>
  );
}
