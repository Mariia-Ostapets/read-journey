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
