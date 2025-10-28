import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { spacing, iconSize } from '../styles';

interface HeaderButtonProps {
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
  color?: string;
}

export const HeaderButton = ({ icon, onPress, color = '#FFF' }: HeaderButtonProps) => (
  <TouchableOpacity onPress={onPress} style={styles.button}>
    <Ionicons name={icon} size={iconSize.md} color={color} />
  </TouchableOpacity>
);

export const HeaderButtonGroup = ({ children }: { children: React.ReactNode }) => (
  <View style={styles.group}>{children}</View>
);

const styles = StyleSheet.create({
  button: {
    marginHorizontal: spacing.xs,
    padding: spacing.xs,
    borderRadius: 8,
  },
  group: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
});
