import React from 'react';
import { View, Text, TextInput, StyleSheet, ViewStyle, TextInputProps } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { spacing, borderRadius, fontSize, fontWeight } from '../styles';

interface InputProps extends TextInputProps {
    label: string;
    error?: string;
    containerStyle?: ViewStyle;
    helperText?: string;
}

export const Input = ({
    label,
    error,
    containerStyle,
    helperText,
    ...textInputProps
}: InputProps) => {
    const { colors } = useTheme();

    return (
        <View style={[styles.container, containerStyle]}>
            <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
            <TextInput
                style={[
                    styles.input,
                    {
                        backgroundColor: colors.surface,
                        color: colors.text,
                        borderColor: error ? colors.error : colors.border,
                    },
                    error && styles.inputError,
                ]}
                placeholderTextColor={colors.textSecondary}
                {...textInputProps}
            />
            {error && <Text style={[styles.errorText, { color: colors.error }]}>{error}</Text>}
            {helperText && !error && (
                <Text style={[styles.helperText, { color: colors.textSecondary }]}>{helperText}</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: spacing.md,
    },
    label: {
        fontSize: fontSize.md,
        fontWeight: fontWeight.medium,
        marginBottom: spacing.xs,
    },
    input: {
        borderWidth: 1.5,
        borderRadius: borderRadius.lg,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.md,
        fontSize: fontSize.base,
    },
    inputError: {
        borderWidth: 2,
    },
    errorText: {
        fontSize: fontSize.sm,
        marginTop: spacing.xs,
    },
    helperText: {
        fontSize: fontSize.sm,
        marginTop: spacing.xs,
    },
});
