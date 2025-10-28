import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { RouteProp, NavigationProp } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';
import { MetricCard } from '../components';
import { RootStackParamList } from '../navigation/AppNavigator';
import { formatCurrency, formatPercent } from '../lib/format';
import { spacing, borderRadius, fontSize, fontWeight, iconSize } from '../styles';
import { Ionicons } from '@expo/vector-icons';

export default function ResultsScreen() {
  const { colors } = useTheme();
  const route = useRoute<RouteProp<RootStackParamList>>();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [expandedMetric, setExpandedMetric] = useState<string | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { inputs, result } = route.params?.data as any;

  const { noi, capRate, grm, debtService, dscr, ltv, cashOnCashReturn, irr, cashFlows } = result;

  const metrics = [
    { key: 'noi', label: 'Net Operating Income', value: formatCurrency(noi) },
    { key: 'capRate', label: 'Cap Rate', value: formatPercent(capRate) },
    { key: 'grm', label: 'GRM', value: grm.toFixed(2) },
    { key: 'debtService', label: 'Annual Debt Service', value: formatCurrency(debtService) },
    { key: 'dscr', label: 'DSCR', value: dscr.toFixed(2) },
    { key: 'ltv', label: 'LTV', value: formatPercent(ltv) },
    { key: 'cashOnCash', label: 'Cash-on-Cash Return', value: formatPercent(cashOnCashReturn) },
    { key: 'irr', label: 'IRR', value: formatPercent(irr) },
  ];

  const explanations: Record<string, string> = {
    noi: 'Annual rental income minus operating expenses and vacancy',
    capRate: 'NOI divided by purchase price. Higher is generally better',
    grm: 'Purchase price divided by annual rent. Lower is generally better',
    debtService: 'Annual loan payments including principal and interest',
    dscr: 'NOI divided by annual debt service. Should be > 1.0',
    ltv: 'Loan amount divided by purchase price',
    cashOnCash: 'Annual cash flow divided by initial cash investment',
    irr: 'Annualized rate of return over the hold period',
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <Ionicons name="analytics" size={iconSize.lg} color={colors.primary} />
          <Text style={[styles.title, { color: colors.text }]}>Results</Text>
        </View>

        {metrics.map((metric) => (
          <View key={metric.key}>
            <TouchableOpacity
              onPress={() => setExpandedMetric(expandedMetric === metric.key ? null : metric.key)}
            >
              <MetricCard
                label={metric.label}
                value={metric.value}
                helperText={expandedMetric === metric.key ? explanations[metric.key] : undefined}
              />
            </TouchableOpacity>
          </View>
        ))}

        <View
          style={[
            styles.section,
            {
              backgroundColor: colors.card,
              borderRadius: borderRadius.xl,
              padding: spacing.md,
              marginTop: spacing.md,
            },
          ]}
        >
          <View style={styles.sectionHeader}>
            <Ionicons name="trending-up" size={iconSize.md} color={colors.primary} />
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Cash Flow Projection</Text>
          </View>
          <View
            style={[
              styles.cashFlowTable,
              {
                backgroundColor: colors.surface,
                borderRadius: borderRadius.md,
                overflow: 'hidden',
              },
            ]}
          >
            <View style={[styles.tableHeader, { backgroundColor: colors.primary }]}>
              <Text style={styles.tableHeaderText}>Year</Text>
              <Text style={styles.tableHeaderText}>Cash Flow</Text>
            </View>
            {cashFlows.map((flow: { year: number; cashFlow: number }) => (
              <View key={flow.year} style={[styles.tableRow, { borderBottomColor: colors.border }]}>
                <Text style={[styles.tableCell, { color: colors.text }]}>{flow.year}</Text>
                <Text style={[styles.tableCell, { color: colors.text }]}>
                  {formatCurrency(flow.cashFlow)}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[
              styles.backButton,
              {
                backgroundColor: colors.card,
                borderColor: colors.border,
              },
            ]}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={iconSize.md} color={colors.primary} />
            <Text style={[styles.backButtonText, { color: colors.primary }]}>Back</Text>
          </TouchableOpacity>
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
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
    gap: spacing.md,
  },
  title: {
    fontSize: fontSize['3xl'],
    fontWeight: fontWeight.bold,
  },
  section: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
    gap: spacing.sm,
  },
  sectionTitle: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
  },
  cashFlowTable: {
    overflow: 'hidden',
  },
  tableHeader: {
    flexDirection: 'row',
    padding: spacing.md,
  },
  tableHeaderText: {
    flex: 1,
    fontWeight: fontWeight.semibold,
    color: '#FFF',
    fontSize: fontSize.md,
  },
  tableRow: {
    flexDirection: 'row',
    padding: spacing.md,
    borderBottomWidth: 1,
  },
  tableCell: {
    flex: 1,
    fontSize: fontSize.md,
  },
  buttonRow: {
    marginTop: spacing.lg,
    marginBottom: spacing.md,
  },
  backButton: {
    flexDirection: 'row',
    paddingVertical: spacing.md + 2,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    borderWidth: 1,
    justifyContent: 'center',
    gap: spacing.sm,
  },
  backButtonText: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.semibold,
  },
});
