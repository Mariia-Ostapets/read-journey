export const shouldShowHeader = pathname => {
  const showPaths = ['/recommended', '/library'];
  const dynamicPaths = /^\/reading\/[^/]+$/;

  return showPaths.includes(pathname) || dynamicPaths.test(pathname);
};
