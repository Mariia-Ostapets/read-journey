import css from './MyLibraryItem.module.css';

export default function MyLibraryItem({ img, bookTitle, author }) {
  return (
    <div className={css.myLibraryItemContainer}>
      <div className={css.bookImgWrapper}>
        <img className={css.bookImg} src={img} alt={bookTitle} />
      </div>
      <h3 className={css.bookTitle}>{bookTitle}</h3>
      <p className={css.bookAuthor}>{author}</p>
    </div>
  );
}
