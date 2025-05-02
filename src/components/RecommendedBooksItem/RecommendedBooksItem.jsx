import css from './RecommendedBooksItem.module.css';

export default function RecommendedBooksItem({ img, bookTitle, author }) {
  return (
    <>
      <div className={css.bookImgWrapper}>
        <img className={css.bookImg} src={img} alt={bookTitle} />
      </div>
      <h3 className={css.bookTitle}>{bookTitle}</h3>
      <p className={css.bookAuthor}>{author}</p>
    </>
  );
}
