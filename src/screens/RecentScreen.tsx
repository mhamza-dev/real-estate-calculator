import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { spacing, borderRadius, fontSize, fontWeight, iconSize } from '../styles';
import { getCalculations, deleteCalculation, StoredCalculation } from '../lib/storage';

export default function RecentScreen() {
  const { colors } = useTheme();
  const [calculations, setCalculations] = useState<StoredCalculation[]>([]);

  useEffect(() => {
    loadCalculations();
  }, []);

  const loadCalculations = async () => {
    const data = await getCalculations();
    setCalculations(data);
  };

  const handleDelete = async (id: string) => {
    await deleteCalculation(id);
    loadCalculations();
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString();
  };

  const renderItem = ({ item }: { item: StoredCalculation }) => (
    <View style={[styles.item, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
      <View style={styles.itemContent}>
        <Text style={[styles.itemName, { color: colors.text }]}>{item.name}</Text>
        <Text style={[styles.itemDate, { color: colors.textSecondary }]}>
          {formatDate(item.timestamp)}
        </Text>
      </View>
      <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.deleteButton}>
        <Ionicons name="trash-outline" size={iconSize.md} color="#FFF" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Recent Calculations</Text>
      {calculations.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="calendar-outline" size={iconSize.xl} color={colors.textSecondary} />
          <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
            No saved calculations yet
          </Text>
        </View>
      ) : (
        <FlatList
          data={calculations}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          style={styles.list}
          contentContainerStyle={{ paddingBottom: spacing.xxxl }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: fontSize['3xl'],
    fontWeight: fontWeight.bold,
    padding: spacing.md,
  },
  list: {
    flex: 1,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
    borderBottomWidth: 1,
    marginHorizontal: spacing.md,
    borderRadius: borderRadius.md,
    marginBottom: spacing.sm,
  },
  itemContent: {
    flex: 1,
  },
  itemName: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.semibold,
  },
  itemDate: {
    fontSize: fontSize.sm,
    marginTop: spacing.xs,
  },
  deleteButton: {
    padding: spacing.sm,
    backgroundColor: '#FF3B30',
    borderRadius: borderRadius.md,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  emptyText: {
    fontSize: fontSize.base,
    marginTop: spacing.md,
  },
});
