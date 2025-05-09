import { useDispatch } from 'react-redux';
import { deleteReading } from '../../redux/books/operations';
import toast from 'react-hot-toast';
import css from '../DairyEntry/DairyEntry.module.css';
import Button from '../ui/Button/Button';

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
      <div className={css.line}></div>
      <div className={css.details}>
        <h3 className={css.date}>{date}</h3>
        <p className={css.percentage}>{percentage}%</p>
        <p className={css.minutes}>{totalMinutes} minutes</p>
      </div>
      <div className={css.statsAndBtnContainer}>
        <div className={css.stats}>
          <p className={css.pages}>{pagesRead} pages</p>
          <svg className={css.statsIcon}>
            <use href="/sprite.svg?v=3#icon-dairy-graph"></use>
          </svg>
          <p className={css.speed}>{speed} pages per hour</p>
        </div>
        <Button type="button" variant="deleteDairyItem" onClick={handleDelete}>
          <svg width={14} height={14}>
            <use href="/sprite.svg#icon-trash"></use>
          </svg>
        </Button>
      </div>
    </li>
  );
}
