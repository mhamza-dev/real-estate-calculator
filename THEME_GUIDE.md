# Dark/Light Theme Implementation

## Overview
The app now supports dark and light themes that can be toggled via the Settings screen.

## How to Use
1. Open the app
2. Navigate to the **Settings** tab (bottom tab bar)
3. Tap the **Dark Mode** toggle
4. The entire app will instantly switch between light and dark themes

## Theme Colors

### Light Theme
- Background: #F2F2F7
- Surface: #FFFFFF
- Text: #000000
- Primary: #007AFF

### Dark Theme
- Background: #000000
- Surface: #1C1C1E
- Text: #FFFFFF
- Primary: #0A84FF

## Implementation

### Using Theme in Components
```typescript
import { useTheme } from '../context/ThemeContext';

function MyComponent() {
    const { colors, isDark, toggleTheme } = useTheme();
    
    return (
        <View style={{ backgroundColor: colors.background }}>
            <Text style={{ color: colors.text }}>Hello</Text>
        </View>
    );
}
```

### All Available Colors
- `colors.primary` - Main brand color
- `colors.secondary` - Secondary brand color
- `colors.background` - Screen background
- `colors.surface` - Card/surface background
- `colors.text` - Primary text color
- `colors.textSecondary` - Secondary text color
- `colors.border` - Border color
- `colors.error` - Error color
- `colors.success` - Success color
- `colors.warning` - Warning color
- `colors.info` - Info color
- `colors.card` - Card background
- `colors.tabBar` - Tab bar background
- `colors.tabBarActive` - Active tab color
- `colors.tabBarInactive` - Inactive tab color

## Features Implemented
✅ Full theme switching across all screens
✅ Beautiful tab bar with icons (Calculator, Recent, About, Settings)
✅ Theme-aware Input components
✅ Theme-aware MetricCards with shadows
✅ Settings screen with Dark Mode toggle
✅ Smooth transitions between themes

Enjoy your perfectly themed calculator! 🎨

