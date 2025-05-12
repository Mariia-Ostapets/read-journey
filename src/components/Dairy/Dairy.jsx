import { useSelector } from 'react-redux';
import css from './Dairy.module.css';
import { selectReadingBook } from '../../redux/books/selectors';
import DairyEntry from '../DairyEntry/DairyEntry';
import { useId } from 'react';

export default function Dairy() {
  const book = useSelector(selectReadingBook);
  const progress = book.progress?.filter(
    entry =>
      entry.startReading &&
      entry.finishReading &&
      entry.startPage != null &&
      entry.finishPage != null
  );

  const groupedByDate = progress.reduce((acc, entry) => {
    const date = new Date(entry.finishReading).toLocaleDateString('uk-UA');
    const pagesRead = entry.finishPage - entry.startPage + 1;
    if (!acc[date]) {
      acc[date] = {
        date,
        totalPages: 0,
        entries: [],
      };
    }
    acc[date].totalPages += pagesRead;
    acc[date].entries.push(entry);
    return acc;
  }, {});

  const diaryData = Object.values(groupedByDate).sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const entryId = useId();

  return (
    <ul className={css.dairyList}>
      {diaryData.map((entry, index) => (
        <DairyEntry
          key={entryId}
          data={entry}
          book={book}
          isTopEntry={index === 0}
        />
      ))}
    </ul>
  );
}
