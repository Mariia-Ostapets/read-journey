import css from './Dashboard.module.css';
import Filters from '../Filters/Filters';
import StartWorkout from '../StartWorkout/StartWorkout';
import RecommendedBooks from '../RecommendedBooks/RecommendedBooks';
import Banner from '../Banner/Banner';
import Progress from '../Progress/Progress';
import { useShouldRender } from '../../hooks/useShouldRender';
import clsx from 'clsx';
import { useMediaQuery } from 'react-responsive';
import { useDeviceType } from '../../hooks/useDeviceType';

export default function Dashboard() {
  // const isDesktop = useMediaQuery({ minWidth: 1280 });

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
      <Filters />
      {isRecommendedPage && (
        <>
          <StartWorkout />
          {isDesktop && <Banner />}
        </>
      )}

      {isMyLibraryPage && <RecommendedBooks />}

      {isMyReadingPage && <Progress />}
    </section>
  );
}
