import React from 'react';
import { View, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { spacing, borderRadius, shadows } from '../styles';

interface CardProps {
    children: React.ReactNode;
    style?: StyleProp<ViewStyle>;
}

export const Card = ({ children, style }: CardProps): React.ReactElement => {
    const { colors } = useTheme();

    return <View style={[styles.card, { backgroundColor: colors.card }, style]}>{children}</View>;
};

const styles = StyleSheet.create({
    card: {
        borderRadius: borderRadius.xl,
        padding: spacing.lg,
        marginBottom: spacing.md,
        ...shadows.md,
    },
});
