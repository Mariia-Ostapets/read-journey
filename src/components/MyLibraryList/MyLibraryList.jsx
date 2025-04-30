import { useEffect, useState } from 'react';
import css from './MyLibraryList.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoading, selectOwnBooks } from '../../redux/books/selectors';
import { getOwnBooks } from '../../redux/books/operations';
import NoResults from '../ui/NoResults/NoResults';
import Loader from '../ui/Loader/Loader';
import MyLibraryItem from '../MyLibraryItem/MyLibraryItem';
import ModalForm from '../ui/ModalForm/ModalForm';
import Button from '../ui/Button/Button';
import MyLibrarySelect from '../MyLibrarySelect/MyLibrarySelect';

export default function MyLibraryList() {
  const [selectedBook, setSelectedBook] = useState(null);

  const openModal = book => setSelectedBook(book);
  const closeModal = () => setSelectedBook(null);

  const books = useSelector(selectOwnBooks);
  const loading = useSelector(selectIsLoading);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOwnBooks());
  }, [dispatch]);

  const isNoResults = books.length === 0;

  return (
    <section className={css.myLibraryContainer}>
      <h2>My Library</h2>
      <MyLibrarySelect />

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
        </>
      )}
    </section>
  );
}
