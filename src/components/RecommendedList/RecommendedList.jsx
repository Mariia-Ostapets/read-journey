import { useDispatch, useSelector } from 'react-redux';
import css from './RecommendedList.module.css';
import {
  selectIsLoading,
  selectBooks,
  selectCurrentPage,
  selectOwnBooks,
} from '../../redux/books/selectors';
import { useEffect, useState } from 'react';
import { addBookById, getRecommendedBooks } from '../../redux/books/operations';
import Loader from '../ui/Loader/Loader';
import { getBooksPerPage } from '../../utils';
import RecommendedItem from '../RecommendedItem/RecommendedItem';
import Pagination from '../ui/Pagination/Pagination';
import { useMediaQuery } from 'react-responsive';
import ModalForm from '../ui/ModalForm/ModalForm';
import Button from '../ui/Button/Button';
import toast from 'react-hot-toast';
import NoResults from '../ui/NoResults/NoResults';
import Info from '../ui/Info/Info';
import {
  selectAuthorFilter,
  selectTitleFilter,
} from '../../redux/filters/selectors';

export default function RecommendedList() {
  const [selectedBook, setSelectedBook] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const openModal = book => setSelectedBook(book);
  const closeModal = () => setSelectedBook(null);
  const closeSuccessModal = () => setShowSuccessModal(false);

  const books = useSelector(selectBooks);
  const loading = useSelector(selectIsLoading);
  const currentPage = useSelector(selectCurrentPage);
  const ownBooks = useSelector(selectOwnBooks);
  const titleFilter = useSelector(selectTitleFilter);
  const authorFilter = useSelector(selectAuthorFilter);

  // const isMobile = useMediaQuery({ maxWidth: 767 });
  // const isTablet = useMediaQuery({ maxWidth: 1279 });

  // const limit = getBooksPerPage({ isMobile, isTablet });
  const [limit, setLimit] = useState(() => {
    const width = window.innerWidth;
    if (width >= 1280) return 10;
    if (width >= 768) return 8;
    return 2;
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width >= 1280 && limit !== 10) setLimit(10);
      else if (width >= 768 && width < 1280 && limit !== 8) setLimit(8);
      else if (width < 768 && limit !== 2) setLimit(2);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [limit]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getRecommendedBooks({
        limit,
        page: currentPage,
        title: titleFilter,
        author: authorFilter,
      })
    );
  }, [dispatch, limit, currentPage, titleFilter, authorFilter]);

  const isNoResults = books.length === 0;

  const handleAddBook = () => {
    const existingBook = ownBooks.some(
      item => item.title === selectedBook.title
    );
    if (ownBooks.length === 0 || !existingBook) {
      dispatch(addBookById(selectedBook._id))
        .unwrap()
        .then(() => {
          closeModal();
          setShowSuccessModal(true);
        })
        .catch(() => {
          toast.error('Something went wrong. Please try again.');
          closeModal();
        });
    } else {
      toast.success('This book is already in your library.', {
        style: {
          background: '#4f92f7',
        },
      });
    }
    closeModal();
  };

  return (
    <>
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

            <Pagination />
          </>
        )}
      </section>

      <ModalForm
        modalIsOpen={!!selectedBook}
        closeModal={closeModal}
        variant="book"
      >
        {selectedBook && (
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
            <Button
              type="button"
              variant="addToLibrary"
              onClick={handleAddBook}
            >
              Add to library
            </Button>
          </div>
        )}
      </ModalForm>

      <ModalForm
        modalIsOpen={showSuccessModal}
        closeModal={closeSuccessModal}
        variant="notification"
      >
        <Info />
      </ModalForm>
    </>
  );
}
