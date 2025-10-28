import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Input, Button } from '../components';
import { useCalculator } from '../hooks';
import { useTheme } from '../context/ThemeContext';
import { RootStackParamList } from '../navigation/AppNavigator';
import { spacing, borderRadius, fontSize, fontWeight, iconSize } from '../styles';
import { formatCurrency } from '../lib/format';

interface CalculatorFormData {
  purchasePrice: string;
  monthlyRent: string;
  operatingExpenses: string;
  vacancyRate: string;
  loanAmount: string;
  interestRate: string;
  amortizationYears: string;
  interestOnlyYears: string;
  closingCosts: string;
  holdYears: string;
  rentGrowthRate: string;
  expenseGrowthRate: string;
  exitCapRate: string;
  sellingCosts: string;
}

export default function CalculatorScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { calculate } = useCalculator();
  const { colors } = useTheme();
  const [isMonthly, setIsMonthly] = useState(true);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CalculatorFormData>({
    defaultValues: {
      purchasePrice: '',
      monthlyRent: '',
      operatingExpenses: '',
      vacancyRate: '0',
      loanAmount: '',
      interestRate: '',
      amortizationYears: '30',
      interestOnlyYears: '0',
      closingCosts: '0.03',
      holdYears: '5',
      rentGrowthRate: '0.02',
      expenseGrowthRate: '0.02',
      exitCapRate: '',
      sellingCosts: '0.03',
    },
  });

  const onSubmit = (data: CalculatorFormData) => {
    const rentValue = parseFloat(data.monthlyRent) || 0;
    const annualRent = isMonthly ? rentValue * 12 : rentValue;

    // Convert percentages to decimals for calculations
    const vacancyRate = parseFloat(data.vacancyRate) || 0;
    const interestRate = parseFloat(data.interestRate) || 0;
    const closingCosts = parseFloat(data.closingCosts) || 0;
    const rentGrowthRate = parseFloat(data.rentGrowthRate) || 0;
    const expenseGrowthRate = parseFloat(data.expenseGrowthRate) || 0;
    const sellingCosts = parseFloat(data.sellingCosts) || 0;
    const exitCapRate = parseFloat(data.exitCapRate) || 0;

    const inputs = {
      purchasePrice: parseFloat(data.purchasePrice) || 0,
      annualRent,
      operatingExpenses: parseFloat(data.operatingExpenses) || 0,
      vacancyRate: vacancyRate / 100, // Convert to decimal
      loanAmount: parseFloat(data.loanAmount) || 0,
      interestRate: interestRate / 100, // Convert to decimal
      amortizationYears: parseFloat(data.amortizationYears) || 30,
      interestOnlyYears: parseFloat(data.interestOnlyYears) || 0,
      closingCosts: closingCosts / 100, // Convert to decimal
      holdYears: parseFloat(data.holdYears) || 5,
      rentGrowthRate: rentGrowthRate / 100, // Convert to decimal
      expenseGrowthRate: expenseGrowthRate / 100, // Convert to decimal
      exitCapRate: exitCapRate > 0 ? exitCapRate / 100 : undefined,
      sellingCosts: sellingCosts / 100, // Convert to decimal
    };

    const result = calculate(inputs);
    if (result) {
      navigation.navigate('Results', { data: { inputs, result } });
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.content, { paddingBottom: spacing.xxxl }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Property Details</Text>
          <Controller
            control={control}
            name="purchasePrice"
            rules={{ required: 'Required' }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Purchase Price"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                keyboardType="numeric"
                placeholder="1,200,000"
                error={errors.purchasePrice?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="monthlyRent"
            rules={{ required: 'Required' }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View>
                <View style={styles.toggleRow}>
                  <Text style={[styles.label, { color: colors.text }]}>Rent</Text>
                  <TouchableOpacity
                    onPress={() => setIsMonthly(!isMonthly)}
                    style={[styles.toggle, { backgroundColor: colors.border }]}
                  >
                    <Text style={[styles.toggleText, { color: colors.primary }]}>
                      {isMonthly ? 'Monthly' : 'Annual'}
                    </Text>
                  </TouchableOpacity>
                </View>
                <Input
                  label="Rent"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  keyboardType="numeric"
                  placeholder={isMonthly ? '9,000' : '108,000'}
                  error={errors.monthlyRent?.message}
                />
              </View>
            )}
          />
          <Controller
            control={control}
            name="operatingExpenses"
            rules={{ required: 'Required' }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Operating Expenses (Annual)"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                keyboardType="numeric"
                placeholder="24,000"
                error={errors.operatingExpenses?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="vacancyRate"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Vacancy Rate (%)"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                keyboardType="numeric"
                placeholder="0"
                helperText="e.g., 5 for 5%"
              />
            )}
          />
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Loan Details</Text>
          <Controller
            control={control}
            name="loanAmount"
            rules={{ required: 'Required' }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Loan Amount"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                keyboardType="numeric"
                placeholder="780,000"
                error={errors.loanAmount?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="interestRate"
            rules={{ required: 'Required' }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Interest Rate (%)"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                keyboardType="numeric"
                placeholder="6.5"
                error={errors.interestRate?.message}
                helperText="e.g., 6.5 for 6.5%"
              />
            )}
          />
          <Controller
            control={control}
            name="amortizationYears"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Amortization (Years)"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                keyboardType="numeric"
                placeholder="30"
              />
            )}
          />
          <Controller
            control={control}
            name="interestOnlyYears"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Interest-Only Period (Years)"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                keyboardType="numeric"
                placeholder="0"
                helperText="Optional: years before amortization begins"
              />
            )}
          />
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>IRR Projections</Text>
          <Controller
            control={control}
            name="holdYears"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Hold Period (Years)"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                keyboardType="numeric"
                placeholder="5"
              />
            )}
          />
          <Controller
            control={control}
            name="rentGrowthRate"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Rent Growth Rate (%)"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                keyboardType="numeric"
                placeholder="2"
                helperText="Annual growth rate"
              />
            )}
          />
          <Controller
            control={control}
            name="exitCapRate"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Exit Cap Rate (%)"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                keyboardType="numeric"
                placeholder="7.25"
                helperText="For sale price calculation"
              />
            )}
          />
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Costs</Text>
          <Controller
            control={control}
            name="closingCosts"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Closing Costs (%)"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                keyboardType="numeric"
                placeholder="3"
                helperText="Percentage of purchase price"
              />
            )}
          />
          <Controller
            control={control}
            name="sellingCosts"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Selling Costs (%)"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                keyboardType="numeric"
                placeholder="3"
                helperText="Percentage of sale price"
              />
            )}
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button title="Calculate" onPress={handleSubmit(onSubmit)} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: spacing.md,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    marginBottom: spacing.md,
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  label: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.medium,
  },
  toggle: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderRadius: borderRadius.sm,
  },
  toggleText: {
    fontSize: fontSize.sm,
  },
  buttonContainer: {
    marginTop: spacing.md,
    marginBottom: spacing.lg,
  },
});
