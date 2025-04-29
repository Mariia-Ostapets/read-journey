import { useDispatch, useSelector } from 'react-redux';
import css from './RecommendedList.module.css';
import {
  selectIsLoading,
  selectBooks,
  selectCurrentPage,
} from '../../redux/books/selectors';
import { useEffect, useState } from 'react';
import { getRecommendedBooks } from '../../redux/books/operations';
import Loader from '../ui/Loader/Loader';
import { getBooksPerPage } from '../../utils';
import RecommendedItem from '../RecommendedItem/RecommendedItem';
import Pagination from '../ui/Pagination/Pagination';
import { useMediaQuery } from 'react-responsive';
import NoResults from '../ui/NoResults/NoResults';
import ModalForm from '../ui/ModalForm/ModalForm';
import Button from '../ui/Button/Button';

export default function RecommendedList() {
  const [selectedBook, setSelectedBook] = useState(null);

  const openModal = book => setSelectedBook(book);
  const closeModal = () => setSelectedBook(null);

  const books = useSelector(selectBooks);
  const loading = useSelector(selectIsLoading);
  const currentPage = useSelector(selectCurrentPage);

  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1279 });

  const limit = getBooksPerPage({ isMobile, isTablet });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRecommendedBooks({ limit, page: currentPage }));
  }, [dispatch, currentPage, limit]);

  const isNoResults = books.length === 0;

  return (
    <section className={css.recommendedListContainer}>
      <h2 className={css.recommendedListTitle}>Recommended</h2>

      {isNoResults ? (
        <NoResults />
      ) : (
        <>
          {loading && <Loader />}
          <ul className={css.booksList}>
            {books.map(book => (
              <li
                className={css.booksItem}
                key={book._id}
                onClick={() => openModal(book)}
              >
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

          {selectedBook && (
            <ModalForm
              modalIsOpen={!!selectedBook}
              closeModal={closeModal}
              variant="book"
            >
              <div className={css.modalBookContainer}>
                <div className={css.modalBookImgWrapper}>
                  <img
                    className={css.modalBookImg}
                    src={selectedBook.imageUrl}
                    alt={selectedBook.bookTitle}
                  />
                </div>
                <h3 className={css.modalBookTitle}>{selectedBook.title}</h3>
                <p className={css.modalBookAuthor}>{selectedBook.author}</p>
                <p className={css.modalBookPages}>
                  {selectedBook.totalPages} pages
                </p>
                <Button type="button" variant="addBook">
                  Add to library
                </Button>
              </div>
            </ModalForm>
          )}

          <Pagination />
        </>
      )}
    </section>
  );
}
