import { useSelector } from 'react-redux';
import css from './Dairy.module.css';
import { selectReadingBook } from '../../redux/books/selectors';
import DairyEntry from '../DairyEntry/DairyEntry';

export default function Dairy() {
  const book = useSelector(selectReadingBook);
  const progress = book.progress;
  const totalPages = book.totalPages;

  const groupedByDate = progress.reduce((acc, entry) => {
    const date = new Date(entry.finishReading).toLocaleDateString('uk-UA');
    if (!acc[date]) acc[date] = [];
    acc[date].push(entry);
    return acc;
  }, {});

  const diaryData = Object.entries(groupedByDate).map(([date, entries]) => {
    const pagesRead = entries.reduce(
      (sum, e) => sum + (e.finishPage - e.startPage + 1),
      0
    );
    const duration = entries.reduce((sum, e) => {
      const start = new Date(e.startReading);
      const end = new Date(e.finishReading);
      return sum + (end - start);
    }, 0);
    const totalMinutes = Math.floor(duration / 60000);
    const percentage = ((pagesRead / totalPages) * 100).toFixed(1);
    const speed =
      totalMinutes > 0 ? Math.round((pagesRead / totalMinutes) * 60) : 0;

    return {
      date,
      pagesRead,
      totalMinutes,
      percentage,
      speed,
      entries,
    };
  });

  return (
    <ul className={css.dairyList}>
      {diaryData.map((entry, index) => (
        <DairyEntry key={index} data={entry} book={book} />
      ))}
    </ul>
  );
}
