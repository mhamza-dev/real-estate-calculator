import React from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { clearAllCalculations } from '../lib/storage';
import { spacing, borderRadius, fontSize, fontWeight, iconSize } from '../styles';

const Card = ({ children, style }: { children: React.ReactNode; style?: any }) => (
  <View style={[styles.card, style]}>{children}</View>
);

export default function SettingsScreen() {
  const { colors, isDark, toggleTheme } = useTheme();
  const [notifications, setNotifications] = React.useState(true);

  const handleClearData = () => {
    Alert.alert(
      'Clear All Data',
      'Are you sure you want to delete all saved calculations? This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            await clearAllCalculations();
            Alert.alert('Success', 'All calculations have been cleared.');
          },
        },
      ]
    );
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={{ paddingBottom: spacing.xxxl }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.content}>
        <Card style={{ backgroundColor: colors.card }}>
          <TouchableOpacity onPress={toggleTheme} style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Ionicons
                name={isDark ? 'sunny' : 'moon'}
                size={iconSize.md}
                color={colors.primary}
              />
              <View>
                <Text style={[styles.settingLabel, { color: colors.text }]}>Dark Mode</Text>
              </View>
            </View>
            <Switch
              value={isDark}
              onValueChange={toggleTheme}
              trackColor={{ false: '#E5E5EA', true: colors.primary }}
            />
          </TouchableOpacity>
          <Text style={[styles.settingDescription, { color: colors.textSecondary }]}>
            Switch to dark theme for comfortable viewing
          </Text>
        </Card>

        <Card style={{ backgroundColor: colors.card }}>
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Ionicons name="notifications" size={iconSize.md} color="#FF9500" />
              <Text style={[styles.settingLabel, { color: colors.text }]}>Notifications</Text>
            </View>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: '#E5E5EA', true: colors.primary }}
            />
          </View>
          <Text style={[styles.settingDescription, { color: colors.textSecondary }]}>
            Get reminders and updates
          </Text>
        </Card>

        <Card style={{ backgroundColor: colors.card }}>
          <View style={styles.settingInfo}>
            <Ionicons name="globe" size={iconSize.md} color="#34C759" />
            <View style={styles.settingTextContainer}>
              <Text style={[styles.settingLabel, { color: colors.text }]}>Currency</Text>
              <Text style={[styles.settingValue, { color: colors.textSecondary }]}>USD ($)</Text>
            </View>
          </View>
          <Text style={[styles.settingDescription, { color: colors.textSecondary }]}>
            Display currency for all calculations
          </Text>
        </Card>

        <Card style={{ backgroundColor: colors.card }}>
          <View style={styles.settingInfo}>
            <Ionicons name="calculator" size={iconSize.md} color={colors.primary} />
            <View style={styles.settingTextContainer}>
              <Text style={[styles.settingLabel, { color: colors.text }]}>Decimal Places</Text>
              <Text style={[styles.settingValue, { color: colors.textSecondary }]}>2</Text>
            </View>
          </View>
          <Text style={[styles.settingDescription, { color: colors.textSecondary }]}>
            Number of decimal places to display
          </Text>
        </Card>

        <Card style={{ backgroundColor: colors.card }}>
          <TouchableOpacity onPress={handleClearData} style={styles.dangerButton}>
            <Ionicons name="trash" size={iconSize.md} color="#FF3B30" />
            <Text style={styles.dangerButtonText}>Clear All Data</Text>
          </TouchableOpacity>
          <Text style={[styles.settingDescription, { color: colors.textSecondary }]}>
            Delete all saved calculations permanently
          </Text>
        </Card>

        <Card style={{ backgroundColor: colors.card }}>
          <View style={styles.settingInfo}>
            <Ionicons name="information-circle" size={iconSize.md} color={colors.textSecondary} />
            <View style={styles.settingTextContainer}>
              <Text style={[styles.settingLabel, { color: colors.text }]}>App Version</Text>
              <Text style={[styles.settingValue, { color: colors.textSecondary }]}>1.0.0</Text>
            </View>
          </View>
        </Card>

        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: colors.text }]}>
            Real Estate Investment Calculator
          </Text>
          <Text style={[styles.footerSubtext, { color: colors.textSecondary }]}>
            Made with ❤️ for investors
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: spacing.md,
  },
  card: {
    marginBottom: spacing.md,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    flex: 1,
  },
  settingTextContainer: {
    flex: 1,
  },
  settingLabel: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.semibold,
  },
  settingValue: {
    fontSize: fontSize.md,
    marginTop: spacing.xs,
  },
  settingDescription: {
    fontSize: fontSize.sm,
    marginTop: spacing.xs,
    lineHeight: spacing.md + 2,
  },
  dangerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.xs,
    marginBottom: spacing.sm,
  },
  dangerButtonText: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.semibold,
    color: '#FF3B30',
  },
  footer: {
    marginTop: spacing.xl,
    marginBottom: spacing.lg,
    alignItems: 'center',
  },
  footerText: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    marginBottom: spacing.xs,
  },
  footerSubtext: {
    fontSize: fontSize.md,
  },
});
