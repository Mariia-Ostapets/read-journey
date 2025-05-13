import { useDispatch } from 'react-redux';
import { deleteReading } from '../../redux/books/operations';
import toast from 'react-hot-toast';
import css from '../DairyEntry/DairyEntry.module.css';
import Button from '../ui/Button/Button';
import {
  calculatePagesRead,
  calculatePercentage,
  calculateSpeed,
  calculateTotalMinutes,
} from '../../utils';

// export default function DairyEntry({ book, data, isTopEntry }) {
//   const { date, entries } = data;

//   const dispatch = useDispatch();

//   const handleDelete = readingId => {
//     dispatch(deleteReading({ bookId: book._id, readingId }))
//       .unwrap()
//       .then(() => {
//         toast.success('Entry was deleted from your dairy.');
//       })
//       .catch(() => {
//         toast.error('Something went wrong. Please try again.');
//       });
//   };

//   const sortedEntries = [...entries].sort(
//     (a, b) =>
//       new Date(b.finishReading).getTime() - new Date(a.finishReading).getTime()
//   );

//   const totalPagesReadPerDay = sortedEntries.reduce((sum, entry) => {
//     const start = Number(entry.startPage);
//     const finish = Number(entry.finishPage);
//     if (!isNaN(start) && !isNaN(finish)) {
//       return sum + (finish - start + 1);
//     }
//     return sum;
//   }, 0);

//   return (
//     <>
//       {sortedEntries.map((entry, idx) => {
//         const pagesRead = calculatePagesRead(entry);
//         const totalMinutes = calculateTotalMinutes(
//           entry.startReading,
//           entry.finishReading
//         );
//         const speed = calculateSpeed(
//           pagesRead,
//           entry.startReading,
//           entry.finishReading
//         );
//         const percentage = calculatePercentage(
//           entry.finishPage,
//           book.totalPages
//         );
//         const isFirstInGroup = idx === 0;

//         return (
//           <li
//             key={entry._id}
//             className={`${css.diaryEntry} ${
//               isFirstInGroup ? css.firstEntry : ''
//             } ${isTopEntry && isFirstInGroup ? css.topEntry : ''}`}
//           >
//             <div className={css.line}></div>
//             {isFirstInGroup && (
//               <div className={css.dateAndPagesContainer}>
//                 <h3 className={css.date}>{date}</h3>
//                 <p className={css.pages}>{totalPagesReadPerDay} pages</p>
//               </div>
//             )}
//             <div className={css.detailsAndStatsContainer}>
//               <div className={css.details}>
//                 <p className={css.percentage}>{percentage}%</p>
//                 <p className={css.minutes}>{totalMinutes} minutes</p>
//               </div>
//               <div className={css.statsAndBtnContainer}>
//                 <div className={css.stats}>
//                   <svg className={css.statsIcon}>
//                     <use href="/sprite.svg?v=3#icon-dairy-graph"></use>
//                   </svg>
//                   <p className={css.speed}>{speed} pages per hour</p>
//                 </div>
//                 <Button
//                   type="button"
//                   variant="deleteDairyItem"
//                   onClick={() => handleDelete(entry._id)}
//                 >
//                   <svg width={14} height={14}>
//                     <use href="/sprite.svg#icon-trash"></use>
//                   </svg>
//                 </Button>
//               </div>
//             </div>
//           </li>
//         );
//       })}
//     </>
//   );

// }

export default function DairyEntry({ entry, book }) {
  const dispatch = useDispatch();

  const handleDelete = readingId => {
    dispatch(deleteReading({ bookId: book._id, readingId }))
      .unwrap()
      .then(() => {
        toast.success('Entry was deleted from your dairy.');
      })
      .catch(() => {
        toast.error('Something went wrong. Please try again.');
      });
  };

  const pagesRead = calculatePagesRead(entry);
  const totalMinutes = calculateTotalMinutes(
    entry.startReading,
    entry.finishReading
  );
  const speed = calculateSpeed(
    pagesRead,
    entry.startReading,
    entry.finishReading
  );
  const percentage = calculatePercentage(
    entry.startPage,
    entry.finishPage,
    book.totalPages
  );

  return (
    <li className={css.diaryEntry}>
      <div className={css.percentageAndMinutesContainer}>
        <p className={css.percentage}>{percentage}%</p>
        <p className={css.minutes}>{totalMinutes} minutes</p>
      </div>
      <div className={css.statsAndBtnContainer}>
        <div className={css.stats}>
          <svg className={css.statsIcon}>
            <use href="/sprite.svg?v=3#icon-dairy-graph"></use>
          </svg>
          <p className={css.speed}>{speed} pages per hour</p>
        </div>
        <Button
          type="button"
          variant="deleteDairyItem"
          onClick={() => handleDelete(entry._id)}
        >
          <svg width={14} height={14}>
            <use href="/sprite.svg?v=4#icon-trash"></use>
          </svg>
        </Button>
      </div>
    </li>
  );
}
