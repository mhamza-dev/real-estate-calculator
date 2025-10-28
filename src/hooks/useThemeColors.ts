import { useTheme } from '../context/ThemeContext';

// Keep the old hook for backwards compatibility but use the new context
export function useThemeColors() {
  const { colors, isDark } = useTheme();

  return {
    theme: { colors },
    isDarkMode: isDark,
    toggleTheme: () => {
      // This will be managed by the ThemeProvider
    },
  };
}

// Re-export useTheme for convenience
export { useTheme };
