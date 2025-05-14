import Dashboard from '../../components/Dashboard/Dashboard';
import MyLibraryList from '../../components/MyLibraryList/MyLibraryList';
import DocumentTitle from '../../components/ui/DocumentTitle';
import css from './MyLibraryPage.module.css';

export default function MyLibraryPage() {
  return (
    <>
      <DocumentTitle>ReadJourney — Library</DocumentTitle>
      <div className={css.pageContainer}>
        <Dashboard />
        <MyLibraryList />
      </div>
    </>
  );
}
