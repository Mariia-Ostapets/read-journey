import { useDispatch, useSelector } from 'react-redux';
import css from './RecommendedList.module.css';
import {
  selectIsLoading,
  selectBooks,
  selectCurrentPage,
} from '../../redux/books/selectors';
import { useEffect } from 'react';
import { getRecommendedBooks } from '../../redux/books/operations';
import Loader from '../ui/Loader/Loader';
import { useDeviceType } from '../../hooks/useDeviceType';
import { getBooksPerPage } from '../../utils';
import RecommendedItem from '../RecommendedItem/RecommendedItem';

export default function RecommendedList() {
  const books = useSelector(selectBooks);
  const loading = useSelector(selectIsLoading);
  const currentPage = useSelector(selectCurrentPage);

  const deviceType = useDeviceType();
  const isMobile = deviceType === 'mobile';
  const isTablet = deviceType === 'tablet';

  const limit = getBooksPerPage({ isMobile, isTablet });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRecommendedBooks({ limit, page: currentPage }));
  }, [dispatch, limit, currentPage]);

  const isNoResults = books.length === 0;

  return (
    <section className={css.recommendedListContainer}>
      <h2 className={css.recommendedListTitle}>Recommended</h2>
      {isNoResults && (
        <p className={css.noResultsText}>
          No results for your search query. Please try again
        </p>
      )}
      {loading && <Loader />}
      <ul className={css.booksList}>
        {books.map(book => (
          <li className={css.booksItem} key={book._id}>
            <RecommendedItem
              bookTitle={book.title}
              img={book.imageUrl}
              author={book.author}
              totalPages={book.totalPages}
              id={book._id}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
