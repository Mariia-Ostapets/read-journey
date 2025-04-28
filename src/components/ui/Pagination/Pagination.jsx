import { useDispatch, useSelector } from 'react-redux';
import {
  selectCurrentPage,
  selectIsLoading,
  selectTotalPages,
} from '../../../redux/books/selectors';
import css from './Pagination.module.css';
import { goToNextPage, goToPrevPage } from '../../../redux/books/slice';
import Button from '../Button/Button';

export default function Pagination() {
  const currentPage = useSelector(selectCurrentPage);
  const totalPages = useSelector(selectTotalPages);
  const isLoading = useSelector(selectIsLoading);
  const dispatch = useDispatch();

  const handleNextPage = () => {
    dispatch(goToNextPage());
  };

  const handlePrevPage = () => {
    dispatch(goToPrevPage());
  };

  return (
    <div className={css.paginationBtnWrapper}>
      <Button
        className={css.paginationBtn}
        type="button"
        variant="paginationLeft"
        disabled={currentPage === 1 || isLoading}
        onClick={handlePrevPage}
      >
        <svg className={css.paginationBtnIcon} width={32} height={32}>
          <use href="/sprite.svg#icon-chevron-left"></use>
        </svg>
      </Button>
      <Button
        className={css.paginationBtn}
        type="button"
        variant="paginationRight"
        disabled={currentPage === totalPages || isLoading}
        onClick={handleNextPage}
      >
        <svg className={css.paginationBtnIcon} width={32} height={32}>
          <use href="/sprite.svg#icon-chevron-right"></use>
        </svg>
      </Button>
    </div>
  );
}
