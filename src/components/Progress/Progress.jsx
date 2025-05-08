import { useSelector } from 'react-redux';
import NoResults from '../ui/NoResults/NoResults';
import css from './Progress.module.css';
import { selectReadingBook } from '../../redux/books/selectors';
import { getBookStatus } from '../../utils';
import Details from '../Details/Details';

export default function Progress() {
  const book = useSelector(selectReadingBook);
  const bookStatus = getBookStatus(book);

  return (
    <div className={css.progressContainer}>
      {bookStatus.status === null || !bookStatus.isBookStarted ? (
        <>
          <h2 className={css.progressTitle}>Progress</h2>
          <NoResults />
        </>
      ) : (
        <Details />
      )}
    </div>
  );
}
