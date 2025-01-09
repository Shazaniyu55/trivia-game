import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Custom hook to track URL changes and run a callback function.
 * @param callback - Function to run when the URL changes
 */
const useTrackURLChange = (callback: (pathname: string) => void) => {
  const location = useLocation();

  useEffect(() => {
    // Trigger the callback whenever the URL changes
    callback(location.pathname);
  }, [location.pathname, callback]);
};

export default useTrackURLChange;
