import Dashboard from '../../components/Dashboard/Dashboard';
import MyLibrary from '../../components/MyLibrary/MyLibrary';
import css from './MyLibraryPage.module.css';

export default function MyLibraryPage() {
  return (
    <div className={css.pageContainer}>
      <Dashboard />
      <MyLibrary />
    </div>
  );
}
