import Dashboard from '../../components/Dashboard/Dashboard';
import MyLibraryList from '../../components/MyLibraryList/MyLibraryList';
import css from './MyLibraryPage.module.css';

export default function MyLibraryPage() {
  return (
    <div className={css.pageContainer}>
      <Dashboard />
      <MyLibraryList />
    </div>
  );
}
