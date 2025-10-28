import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Card } from '../components';
import { spacing, fontSize, fontWeight, iconSize } from '../styles';
import { Ionicons } from '@expo/vector-icons';

export default function AboutScreen() {
  const { colors } = useTheme();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={{ paddingBottom: spacing.xxxl }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>About</Text>

        <Card>
          <View style={styles.iconContainer}>
            <Ionicons name="calculator" size={iconSize.xl} color={colors.primary} />
          </View>
          <Text style={[styles.cardTitle, { color: colors.text }]}>
            Commercial Real Estate Investment Calculator
          </Text>
          <Text style={[styles.cardText, { color: colors.textSecondary }]}>
            Calculate key financial metrics for commercial real estate investments including NOI,
            Cap Rate, GRM, DSCR, LTV, Cash-on-Cash Return, and IRR.
          </Text>
        </Card>

        <Card>
          <Text style={[styles.cardTitle, { color: colors.text }]}>Metrics Explained</Text>

          <View style={styles.metricItem}>
            <Ionicons name="cash-outline" size={iconSize.md} color={colors.primary} />
            <View style={styles.metricContent}>
              <Text style={[styles.sectionHeader, { color: colors.text }]}>
                NOI (Net Operating Income)
              </Text>
              <Text style={[styles.cardText, { color: colors.textSecondary }]}>
                Annual rental income minus operating expenses and vacancy. Represents the property's
                income after operational costs.
              </Text>
            </View>
          </View>

          <View style={styles.metricItem}>
            <Ionicons name="stats-chart-outline" size={iconSize.md} color={colors.primary} />
            <View style={styles.metricContent}>
              <Text style={[styles.sectionHeader, { color: colors.text }]}>
                Cap Rate (Capitalization Rate)
              </Text>
              <Text style={[styles.cardText, { color: colors.textSecondary }]}>
                NOI divided by purchase price. Indicates the property's annual return if purchased
                entirely in cash.
              </Text>
            </View>
          </View>

          <View style={styles.metricItem}>
            <Ionicons name="home-outline" size={iconSize.md} color={colors.primary} />
            <View style={styles.metricContent}>
              <Text style={[styles.sectionHeader, { color: colors.text }]}>
                GRM (Gross Rent Multiplier)
              </Text>
              <Text style={[styles.cardText, { color: colors.textSecondary }]}>
                Purchase price divided by annual rent. A lower GRM suggests the property generates
                more income relative to its price.
              </Text>
            </View>
          </View>

          <View style={styles.metricItem}>
            <Ionicons name="shield-checkmark-outline" size={iconSize.md} color={colors.primary} />
            <View style={styles.metricContent}>
              <Text style={[styles.sectionHeader, { color: colors.text }]}>
                DSCR (Debt Service Coverage Ratio)
              </Text>
              <Text style={[styles.cardText, { color: colors.textSecondary }]}>
                NOI divided by annual debt service. A ratio above 1.0 indicates the property
                generates enough income to cover debt payments.
              </Text>
            </View>
          </View>

          <View style={styles.metricItem}>
            <Ionicons name="card-outline" size={iconSize.md} color={colors.primary} />
            <View style={styles.metricContent}>
              <Text style={[styles.sectionHeader, { color: colors.text }]}>
                LTV (Loan-to-Value)
              </Text>
              <Text style={[styles.cardText, { color: colors.textSecondary }]}>
                Loan amount divided by purchase price. Represents the proportion of the property's
                value financed through debt.
              </Text>
            </View>
          </View>

          <View style={styles.metricItem}>
            <Ionicons name="trending-up-outline" size={iconSize.md} color={colors.primary} />
            <View style={styles.metricContent}>
              <Text style={[styles.sectionHeader, { color: colors.text }]}>
                Cash-on-Cash Return
              </Text>
              <Text style={[styles.cardText, { color: colors.textSecondary }]}>
                Annual cash flow divided by initial cash investment. Shows the annual return on your
                cash down payment.
              </Text>
            </View>
          </View>

          <View style={styles.metricItem}>
            <Ionicons name="rocket-outline" size={iconSize.md} color={colors.primary} />
            <View style={styles.metricContent}>
              <Text style={[styles.sectionHeader, { color: colors.text }]}>
                IRR (Internal Rate of Return)
              </Text>
              <Text style={[styles.cardText, { color: colors.textSecondary }]}>
                The annualized rate of return over the hold period, accounting for all cash flows
                including purchase, annual income, and sale proceeds.
              </Text>
            </View>
          </View>
        </Card>

        <Card>
          <View style={styles.iconContainer}>
            <Ionicons name="information-circle-outline" size={iconSize.xl} color={colors.warning} />
          </View>
          <Text style={[styles.cardTitle, { color: colors.text }]}>Disclaimer</Text>
          <Text style={[styles.cardText, { color: colors.textSecondary }]}>
            This calculator is for educational and estimation purposes only. Actual investment
            performance may vary significantly. Always consult with qualified financial and legal
            professionals before making investment decisions.
          </Text>
        </Card>

        <View style={styles.versionContainer}>
          <Text style={[styles.version, { color: colors.textSecondary }]}>Version 1.0.0</Text>
          <Text style={[styles.version, { color: colors.textSecondary }]}>
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
  title: {
    fontSize: fontSize['3xl'],
    fontWeight: fontWeight.bold,
    marginBottom: spacing.lg,
  },
  cardTitle: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  cardText: {
    fontSize: fontSize.md,
    lineHeight: spacing.lg + 4,
    marginBottom: spacing.md,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  metricItem: {
    flexDirection: 'row',
    marginBottom: spacing.md,
    gap: spacing.md,
  },
  metricContent: {
    flex: 1,
  },
  sectionHeader: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.semibold,
    marginBottom: spacing.xs,
  },
  versionContainer: {
    marginTop: spacing.lg,
    marginBottom: spacing.xl,
    alignItems: 'center',
    gap: spacing.xs,
  },
  version: {
    fontSize: fontSize.sm,
  },
});
