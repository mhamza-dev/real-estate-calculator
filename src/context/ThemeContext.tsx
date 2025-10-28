import React, { createContext, useContext, useState, useMemo } from 'react';

export interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  border: string;
  error: string;
  success: string;
  warning: string;
  info: string;
  card: string;
  tabBar: string;
  tabBarActive: string;
  tabBarInactive: string;
  accent: string;
  gradient: string[];
}

const lightColors: ThemeColors = {
  primary: '#6366F1', // Modern indigo
  secondary: '#8B5CF6', // Purple
  background: '#F8FAFC',
  surface: '#FFFFFF',
  text: '#1E293B',
  textSecondary: '#64748B',
  border: '#E2E8F0',
  error: '#EF4444',
  success: '#10B981',
  warning: '#F59E0B',
  info: '#3B82F6',
  card: '#FFFFFF',
  tabBar: '#FFFFFF',
  tabBarActive: '#6366F1',
  tabBarInactive: '#94A3B8',
  accent: '#EC4899',
  gradient: ['#6366F1', '#8B5CF6'],
};

const darkColors: ThemeColors = {
  primary: '#818CF8', // Lighter indigo for dark mode
  secondary: '#A78BFA',
  background: '#0F172A',
  surface: '#1E293B',
  text: '#F1F5F9',
  textSecondary: '#94A3B8',
  border: '#334155',
  error: '#F87171',
  success: '#34D399',
  warning: '#FBBF24',
  info: '#60A5FA',
  card: '#1E293B',
  tabBar: '#1E293B',
  tabBarActive: '#818CF8',
  tabBarInactive: '#64748B',
  accent: '#F472B6',
  gradient: ['#818CF8', '#A78BFA'],
};

interface ThemeContextType {
  colors: ThemeColors;
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(false);

  const colors = useMemo(() => {
    return isDark ? darkColors : lightColors;
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ colors, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
