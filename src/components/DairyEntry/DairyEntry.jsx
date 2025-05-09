import { useDispatch } from 'react-redux';
import { deleteReading } from '../../redux/books/operations';
import toast from 'react-hot-toast';
import css from '../DairyEntry/DairyEntry.module.css';

export default function DairyEntry({ book, data }) {
  const { date, pagesRead, totalMinutes, percentage, speed, entries } = data;

  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteReading({ bookId: book._id, readingId: entries._id }))
      .unwrap()
      .then(() => {
        toast.success('Entry was deleted from your dairy.');
      })
      .catch(() => {
        toast.error('Something went wrong. Please try again.');
      });
  };

  return (
    <li className={css.diaryEntry}>
      <h3 className={css.date}>{date}</h3>
      <div className={css.details}>
        <p className={css.percentage}>{percentage}%</p>
        <p className={css.minutes}>{totalMinutes} minutes</p>
      </div>

      <div className={css.stats}>
        <div className={css.pages}>{pagesRead} pages</div>
        <div className={css.graphBar}></div>
        <div className={css.speed}>{speed} pages per hour</div>
      </div>

      <button className={css.trashBtn} onClick={handleDelete}>
        🗑
      </button>
    </li>
  );
}
