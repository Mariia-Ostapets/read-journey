import css from './Banner.module.css';

export default function Banner() {
  return (
    <div className={css.bannerContainer}>
      <picture className={css.bannerImg}>
        <source
          srcSet="/images/books-banner.png 1x, /images/books-banner@2x.png 2x"
          media="(min-width: 1280px)"
        />
        <img
          src="/images/books-banner.png"
          alt="Books Are Windows Img"
          width="40"
          height="40"
        />
      </picture>
      <p className={css.bannerText}>
        "Books are <span className={css.bannerAccentText}>windows</span> to the
        world, and reading is a journey into the unknown."
      </p>
    </div>
  );
}
