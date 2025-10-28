import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Card } from './Card';
import { useTheme } from '../context/ThemeContext';
import { spacing, fontSize, fontWeight } from '../styles';

interface MetricCardProps {
    label: string;
    value: string;
    helperText?: string;
    onPress?: () => void;
}

export const MetricCard = ({ label, value, helperText }: MetricCardProps) => {
    const { colors } = useTheme();

    return (
        <Card style={styles.metricCard}>
            <Text style={[styles.label, { color: colors.textSecondary }]}>{label}</Text>
            <Text style={[styles.value, { color: colors.primary }]}>{value}</Text>
            {helperText && (
                <Text style={[styles.helperText, { color: colors.textSecondary }]}>{helperText}</Text>
            )}
        </Card>
    );
};

const styles = StyleSheet.create({
    metricCard: {
        padding: spacing.xl,
        minHeight: 110,
    },
    label: {
        fontSize: fontSize.md,
        marginBottom: spacing.xs,
        fontWeight: fontWeight.medium,
    },
    value: {
        fontSize: fontSize['4xl'],
        fontWeight: fontWeight.bold,
        marginVertical: spacing.xs,
    },
    helperText: {
        fontSize: fontSize.sm,
        marginTop: spacing.xs,
        lineHeight: spacing.md,
    },
});
