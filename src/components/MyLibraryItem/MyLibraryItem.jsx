import { useDispatch } from 'react-redux';
import Button from '../ui/Button/Button';
import css from './MyLibraryItem.module.css';
import { deleteOwnBook } from '../../redux/books/operations';
import toast from 'react-hot-toast';

export default function MyLibraryItem({ img, bookTitle, author, id }) {
  const dispatch = useDispatch();

  const handleDeleteBook = e => {
    e.stopPropagation();

    dispatch(deleteOwnBook(id))
      .unwrap()
      .then(() => {
        toast.success('Book was deleted from your library.');
      })
      .catch(() => {
        toast.error('Something went wrong. Please try again.');
      });
  };

  return (
    <div className={css.myLibraryItemContainer}>
      <div className={css.bookImgWrapper}>
        <img
          className={css.bookImg}
          src={img || '/images/default-book-small.png'}
          alt={bookTitle}
        />
      </div>
      <div className={css.discriptionAndBtnWrapper}>
        <div className={css.titleAndAuthorWrapper}>
          <h3 className={css.bookTitle}>{bookTitle}</h3>
          <p className={css.bookAuthor}>{author}</p>
        </div>
        <Button type="button" variant="deleteBook" onClick={handleDeleteBook}>
          <svg width={28} height={28}>
            <use href="/sprite.svg#icon-trash-block"></use>
          </svg>
        </Button>
      </div>
    </div>
  );
}
