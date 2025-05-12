export const shouldShowHeader = pathname => {
  const showPaths = ['/recommended', '/library'];
  const dynamicPaths = /^\/reading\/[^/]+$/;

  return showPaths.includes(pathname) || dynamicPaths.test(pathname);
};

export const getFirstLetter = name => {
  if (!name) return '';
  return name.charAt(0).toUpperCase();
};

export const getBooksPerPage = ({ isMobile, isTablet }) => {
  if (isMobile) {
    return 2;
  } else if (isTablet) {
    return 8;
  } else {
    return 10;
  }
};

export const getRandomBooks = (books, count) => {
  const shuffled = [...books].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export const getBookStatus = book => {
  const progress = book.progress;
  let status;
  let isBookStarted;
  if (progress) {
    const lastItem = progress.length > 0 && progress[progress.length - 1];
    status = lastItem ? lastItem.status : null;
    isBookStarted =
      progress.length > 0 && progress[0].finishPage !== undefined
        ? progress[0].finishPage
        : false;
  }
  return { status, isBookStarted };
};

export const calculatePagesRead = entry => {
  const startPage = Number(entry.startPage);
  const finishPage = Number(entry.finishPage);
  return !isNaN(startPage) && !isNaN(finishPage)
    ? finishPage - startPage + 1
    : 0;
};

export const calculateTotalMinutes = (startReading, finishReading) => {
  const start = new Date(startReading);
  const end = new Date(finishReading);
  const isValidTime = !isNaN(start) && !isNaN(end);
  const totalSeconds = isValidTime ? Math.floor((end - start) / 1000) : 0;
  return Math.round(totalSeconds / 60);
};

export const calculateSpeed = (pagesRead, startReading, finishReading) => {
  const start = new Date(startReading);
  const end = new Date(finishReading);
  const isValidTime = !isNaN(start) && !isNaN(end);
  const totalSeconds = isValidTime ? Math.floor((end - start) / 1000) : 0;
  return totalSeconds > 0 ? Math.round((pagesRead / totalSeconds) * 3600) : 0;
};

export const calculatePercentage = (finishPage, totalPages) => {
  return ((Number(finishPage) / totalPages) * 100).toFixed(1);
};

export const calculateTotalPagesRead = entries => {
  return entries.reduce((sum, entry) => sum + calculatePagesRead(entry), 0);
};
