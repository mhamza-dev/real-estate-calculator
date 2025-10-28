import { useMemo, useState, useCallback } from 'react';
import { Theme, lightTheme } from '../styles';

export function useTheme() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const theme: Theme = useMemo(() => {
    return lightTheme; // For now, just return light theme
    // Can be extended to return darkTheme when isDarkMode is true
  }, [isDarkMode]);

  const toggleTheme = useCallback(() => {
    setIsDarkMode((prev) => !prev);
  }, []);

  return { theme, isDarkMode, toggleTheme };
}
