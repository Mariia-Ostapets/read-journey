import { useState, useEffect } from 'react';

export const useDeviceType = () => {
  const getDeviceType = () => {
    const width = window.innerWidth;
    if (width <= 767) return 'mobile';
    if (width >= 768 && width <= 1279) return 'tablet';
    return 'desktop';
  };

  const [deviceType, setDeviceType] = useState(getDeviceType);

  useEffect(() => {
    const handleResize = () => {
      setDeviceType(getDeviceType());
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return deviceType;
};
