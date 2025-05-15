import { useDispatch, useSelector } from 'react-redux';
import css from './RecommendedBooks.module.css';
import { selectAllBooks, selectIsLoading } from '../../redux/books/selectors';
import { useEffect } from 'react';
import { getAllBooks } from '../../redux/books/operations';
import NoResults from '../ui/NoResults/NoResults';
import Loader from '../ui/Loader/Loader';
import RecommendedBooksItem from '../RecommendedBooksItem/RecommendedBooksItem';
import { Link } from 'react-router-dom';
import { getRandomBooks } from '../../utils';

export default function RecommendedBooks() {
  const books = useSelector(selectAllBooks);
  const loading = useSelector(selectIsLoading);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllBooks());
  }, [dispatch]);

  const randomBooks = getRandomBooks(books, 3);

  const isNoResults = books.length === 0;

  return (
    <div className={css.recommendedBooksContainer}>
      <h2 className={css.recomBooksTitle}>Recommended Books</h2>
      {isNoResults ? (
        <NoResults />
      ) : (
        <>
          {loading && <Loader />}
          <ul className={css.booksList}>
            {randomBooks.map(book => (
              <li className={css.booksItem} key={book._id}>
                <RecommendedBooksItem
                  bookTitle={book.title}
                  img={book.imageUrl}
                  author={book.author}
                />
              </li>
            ))}
          </ul>
        </>
      )}
      <Link to="/recommended" className={css.linkText}>
        Home{' '}
        <svg className={css.linkIcon}>
          <use href="/sprite.svg#icon-arrow-right"></use>
        </svg>
      </Link>
    </div>
  );
}
