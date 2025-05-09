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
    <div className={css.diaryEntry}>
      <div>
        <div className={css.date}>{date}</div>
        <div className={css.details}>
          <span>{percentage}%</span>
          <span>{totalMinutes} minutes</span>
        </div>
      </div>

      <div className={css.stats}>
        <div className={css.pages}>{pagesRead} pages</div>
        <div className={css.graphBar}></div>
        <div className={css.speed}>{speed} pages per hour</div>
      </div>

      <button className={css.trashBtn} onClick={handleDelete}>
        🗑
      </button>
    </div>
  );
}
