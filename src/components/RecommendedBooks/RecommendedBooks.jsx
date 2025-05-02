import { useDispatch, useSelector } from 'react-redux';
import css from './RecommendedBooks.module.css';
import { selectBooks, selectIsLoading } from '../../redux/books/selectors';
import { useEffect } from 'react';
import { getRecommendedBooks } from '../../redux/books/operations';
import NoResults from '../ui/NoResults/NoResults';
import Loader from '../ui/Loader/Loader';
import RecommendedBooksItem from '../RecommendedBooksItem/RecommendedBooksItem';
import { Link } from 'react-router-dom';

export default function RecommendedBooks() {
  const books = useSelector(selectBooks);
  const loading = useSelector(selectIsLoading);
  const limit = 3;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRecommendedBooks({ limit }));
  }, [dispatch]);

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
            {books.map(book => (
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
