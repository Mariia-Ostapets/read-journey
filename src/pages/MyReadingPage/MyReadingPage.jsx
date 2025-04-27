import Dashboard from '../../components/Dashboard/Dashboard';
import MyReading from '../../components/MyReading/MyReading';
import css from './MyReadingPage.module.css';

export default function MyReadingPage() {
  return (
    <div className={css.pageContainer}>
      <Dashboard />
      <MyReading />
    </div>
  );
}
