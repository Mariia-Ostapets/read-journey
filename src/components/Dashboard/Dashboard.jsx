import css from './Dashboard.module.css';
import Filters from '../Filters/Filters';
import StartWorkout from '../StartWorkout/StartWorkout';
import RecommendedBooks from '../RecommendedBooks/RecommendedBooks';
import Banner from '../Banner/Banner';
import Progress from '../Progress/Progress';
import { useDeviceType } from '../../hooks/useDeviceType';
import { useShouldRender } from '../../hooks/useShouldRender';
import clsx from 'clsx';

export default function Dashboard() {
  const deviceType = useDeviceType();

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
      <Filters />
      {isRecommendedPage && (
        <>
          <StartWorkout />
          {deviceType === 'desktop' && <Banner />}
        </>
      )}

      {isMyLibraryPage && <RecommendedBooks />}

      {isMyReadingPage && <Progress />}
    </section>
  );
}
