import AsyncStorage from '@react-native-async-storage/async-storage';

export interface StoredCalculation {
  id: string;
  name: string;
  timestamp: number;
  data: unknown;
}

const CALCULATIONS_KEY = 'recent_calculations';
const MAX_STORED = 50;

/**
 * Save a calculation to local storage
 */
export async function saveCalculation(calculation: StoredCalculation): Promise<void> {
  try {
    const existing = await getCalculations();
    const updated = [calculation, ...existing].slice(0, MAX_STORED);
    await AsyncStorage.setItem(CALCULATIONS_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Failed to save calculation:', error);
    throw error;
  }
}

/**
 * Get all stored calculations
 */
export async function getCalculations(): Promise<StoredCalculation[]> {
  try {
    const data = await AsyncStorage.getItem(CALCULATIONS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Failed to get calculations:', error);
    return [];
  }
}

/**
 * Delete a calculation by ID
 */
export async function deleteCalculation(id: string): Promise<void> {
  try {
    const existing = await getCalculations();
    const updated = existing.filter((calc) => calc.id !== id);
    await AsyncStorage.setItem(CALCULATIONS_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Failed to delete calculation:', error);
    throw error;
  }
}

/**
 * Clear all calculations
 */
export async function clearAllCalculations(): Promise<void> {
  try {
    await AsyncStorage.removeItem(CALCULATIONS_KEY);
  } catch (error) {
    console.error('Failed to clear calculations:', error);
    throw error;
  }
}
