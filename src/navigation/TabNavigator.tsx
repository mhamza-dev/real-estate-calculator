import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { spacing, borderRadius, fontSize, fontWeight, iconSize, shadows } from '../styles';
import CalculatorScreen from '../screens/CalculatorScreen';
import RecentScreen from '../screens/RecentScreen';
import AboutScreen from '../screens/AboutScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { RouteProp } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

export function TabNavigator() {
    const { colors } = useTheme();

    const renderHeaderLeft = () => (
        <View
            style={{
                paddingLeft: spacing.md,
                flexDirection: 'row',
                alignItems: 'center',
                gap: spacing.sm,
            }}
        >
            <View style={{ backgroundColor: '#FFF', borderRadius: borderRadius.md, padding: spacing.xs }}>
                <Ionicons name="business" size={iconSize.lg} color={colors.primary} />
            </View>
        </View>
    );

    const renderHeaderRight = () => (
        <View
            style={{
                paddingRight: spacing.md,
                flexDirection: 'row',
                alignItems: 'center',
                gap: spacing.xs,
            }}
        >
            <TouchableOpacity style={{ padding: spacing.xs }}>
                <Ionicons name="share-outline" size={iconSize.md} color="#FFF" />
            </TouchableOpacity>
            <TouchableOpacity style={{ padding: spacing.xs }}>
                <Ionicons name="search-outline" size={iconSize.md} color="#FFF" />
            </TouchableOpacity>
        </View>
    );

    return (
        <Tab.Navigator
            screenOptions={({ route }: { route: RouteProp<any, any> }) => ({
                tabBarActiveTintColor: colors.tabBarActive,
                tabBarInactiveTintColor: colors.tabBarInactive,
                headerStyle: {
                    backgroundColor: colors.primary,
                    height: 100,
                    ...shadows.lg,
                },
                headerTintColor: '#FFF',
                headerTitleStyle: {
                    fontWeight: fontWeight.bold,
                    fontSize: fontSize['2xl'],
                    letterSpacing: 0.5,
                },
                headerTitleAlign: 'center' as const,
                headerLeft: renderHeaderLeft,
                headerRight: renderHeaderRight,
                tabBarStyle: {
                    backgroundColor: colors.tabBar,
                    borderTopWidth: 1,
                    borderTopColor: colors.border,
                    height: 80,
                    paddingBottom: spacing.md,
                    paddingTop: spacing.sm,
                    ...shadows.lg,
                    elevation: 0,
                },
                tabBarLabelStyle: {
                    fontSize: fontSize.sm,
                    fontWeight: fontWeight.semibold,
                    paddingBottom: spacing.xs,
                    letterSpacing: 0.3,
                },
                tabBarItemStyle: {
                    paddingVertical: spacing.xs,
                },
                tabBarIcon: ({ color, size }: { color: string; size: number }) => {
                    let iconName: keyof typeof Ionicons.glyphMap = 'calculator';
                    if (route.name === 'Calculator') iconName = 'calculator';
                    if (route.name === 'Recent') iconName = 'time';
                    if (route.name === 'About') iconName = 'information-circle';
                    if (route.name === 'Settings') iconName = 'settings';
                    return <Ionicons name={iconName} size={size + 2} color={color} />;
                },
            })}
        >
            <Tab.Screen
                name="Calculator"
                component={CalculatorScreen}
                options={{ headerTitle: 'Investment Calculator' }}
            />
            <Tab.Screen
                name="Recent"
                component={RecentScreen}
                options={{ headerTitle: 'Recent Calculations' }}
            />
            <Tab.Screen name="About" component={AboutScreen} options={{ headerTitle: 'About' }} />
            <Tab.Screen
                name="Settings"
                component={SettingsScreen}
                options={{ headerTitle: 'Settings' }}
            />
        </Tab.Navigator>
    );
}
