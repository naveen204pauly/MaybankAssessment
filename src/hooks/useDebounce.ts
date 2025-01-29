import {useRef, useEffect} from 'react';

type DebounceCallback = (...args: any[]) => void;

/**
 * A custom hook for debouncing a function.
 * @param callback The function to debounce.
 * @param delay The delay in milliseconds.
 */
const useDebounce = (callback: DebounceCallback, delay: number) => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const debouncedFunction = (...args: any[]) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return debouncedFunction;
};

export default useDebounce;
