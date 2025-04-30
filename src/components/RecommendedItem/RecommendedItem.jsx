import css from './RecommendedItem.module.css';

export default function RecommendedItem({ img, bookTitle, author }) {
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
