import Dashboard from '../../components/Dashboard/Dashboard';
import MyReading from '../../components/MyReading/MyReading';
import DocumentTitle from '../../components/ui/DocumentTitle';
import css from './MyReadingPage.module.css';

export default function MyReadingPage() {
  return (
    <>
      <DocumentTitle>ReadJourney — Reading</DocumentTitle>
      <div className={css.pageContainer}>
        <Dashboard />
        <MyReading />
      </div>
    </>
  );
}
