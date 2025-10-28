import { useTheme } from '../context/ThemeContext';

/**
 * Helper to create themed styles
 */
export function useThemedStyles<T extends Record<string, any>>(
  createStylesFn: (colors: ReturnType<typeof useTheme>['colors']) => T
) {
  const { colors } = useTheme();
  const styles = createStylesFn(colors);
  return styles;
}
