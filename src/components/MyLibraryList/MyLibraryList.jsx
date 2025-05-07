import { useEffect, useState } from 'react';
import css from './MyLibraryList.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoading, selectOwnBooks } from '../../redux/books/selectors';
import { getBookById, getOwnBooks } from '../../redux/books/operations';
import Loader from '../ui/Loader/Loader';
import MyLibraryItem from '../MyLibraryItem/MyLibraryItem';
import ModalForm from '../ui/ModalForm/ModalForm';
import Button from '../ui/Button/Button';
import MyLibrarySelect from '../MyLibrarySelect/MyLibrarySelect';
import NoResults from '../ui/NoResults/NoResults';
import { selectStatus } from '../../redux/filters/selectors';
import { setStatusFilter } from '../../redux/filters/slice';
import { useNavigate } from 'react-router-dom';

export default function MyLibraryList() {
  const [selectedBook, setSelectedBook] = useState(null);

  const openModal = book => setSelectedBook(book);
  const closeModal = () => setSelectedBook(null);

  const books = useSelector(selectOwnBooks);
  const loading = useSelector(selectIsLoading);
  const status = useSelector(selectStatus);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getOwnBooks());
  }, [dispatch]);

  const filteredBooks = books.filter(book => {
    if (status === 'all') return true;
    return book.status === status;
  });

  const handleFilterChange = option => {
    dispatch(setStatusFilter(option.value));
  };

  const isNoResults = filteredBooks.length === 0;

  const handleStartReading = () => {
    dispatch(getBookById(selectedBook._id));
    closeModal();
    navigate(`/reading/${selectedBook._id}`);
  };

  return (
    <section className={css.myLibraryContainer}>
      <div className={css.titleAndSelectContainer}>
        <h2 className={css.myLibraryTitle}>My Library</h2>
        <MyLibrarySelect status={status} onChange={handleFilterChange} />
      </div>

      {isNoResults ? (
        <NoResults />
      ) : (
        <>
          {loading && <Loader />}
          <ul className={css.booksList}>
            {filteredBooks.map(book => (
              <li
                className={css.booksItem}
                key={book._id}
                onClick={() => openModal(book)}
              >
                <MyLibraryItem
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
                    src={
                      selectedBook.imageUrl || '/images/default-book-small.png'
                    }
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
                  onClick={handleStartReading}
                >
                  Start reading
                </Button>
              </div>
            </ModalForm>
          )}
        </>
      )}
    </section>
  );
}
