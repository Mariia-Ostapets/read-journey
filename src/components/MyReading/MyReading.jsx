import { useSelector } from 'react-redux';
import css from './MyReading.module.css';
import { selectReadingBook } from '../../redux/books/selectors';
import Button from '../ui/Button/Button';
import { getBookStatus } from '../../utils';

export default function MyReading() {
  const book = useSelector(selectReadingBook);

  const bookStatus = getBookStatus(book);

  return (
    <section className={css.myReadingContainer}>
      <h2 className={css.myReadingTitle}>My Reading</h2>
      <div className={css.myReadingItemContainer}>
        <div className={css.bookImgWrapper}>
          <img
            className={css.bookImg}
            src={book?.imageUrl || '/images/default-book-small.png'}
            alt={book.title}
          />
        </div>
        <div className={css.discriptionAndBtnWrapper}>
          <div className={css.titleAndAuthorWrapper}>
            <h3 className={css.bookTitle}>{book.title}</h3>
            <p className={css.bookAuthor}>{book.author}</p>
          </div>
          {bookStatus.status === 'active' ? (
            <svg className={css.readingIcon}>
              <use href="/sprite.svg#icon-btn-off"></use>
            </svg>
          ) : (
            <svg className={css.readingIcon}>
              <use href="/sprite.svg#icon-btn-on"></use>
            </svg>
          )}
        </div>
      </div>
    </section>
  );
}
