import css from './Dashboard.module.css';
import Filters from '../Filters/Filters';
import StartWorkout from '../StartWorkout/StartWorkout';
import RecommendedBooks from '../RecommendedBooks/RecommendedBooks';
import Banner from '../Banner/Banner';
import Progress from '../Progress/Progress';
import { useShouldRender } from '../../hooks/useShouldRender';
import clsx from 'clsx';
import { useDeviceType } from '../../hooks/useDeviceType';
import AddBook from '../AddBook/AddBook';
import ReadingForm from '../ReadingForm/ReadingForm';

export default function Dashboard() {
  const deviceType = useDeviceType();

  const isDesktop = deviceType === 'desktop';

  const isRecommendedPage = useShouldRender(['/recommended']);
  const isMyLibraryPage = useShouldRender(['/library']);
  const isMyReadingPage = useShouldRender([/^\/reading\/[^/]+$/]);

  return (
    <section
      className={clsx(
        css.dashboardContainer,
        isRecommendedPage && css.recommendedPage,
        isMyLibraryPage && css.libraryPage,
        isMyReadingPage && css.readingPage
      )}
    >
      {isRecommendedPage && (
        <>
          <Filters />
          <StartWorkout />
          {isDesktop && <Banner />}
        </>
      )}

      {isMyLibraryPage && (
        <>
          <AddBook />
          <RecommendedBooks />
        </>
      )}

      {isMyReadingPage && (
        <>
          <ReadingForm />
          <Progress />
        </>
      )}
    </section>
  );
}
