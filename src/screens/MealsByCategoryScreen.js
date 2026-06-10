import React, { useEffect, useState, useCallback } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { getMealsByCategory } from '../api/mealApi';
import MealCard from '../components/MealCard';
import Loader from '../components/Loader';
import ErrorView from '../components/ErrorView';
import EmptyState from '../components/EmptyState';
import { colors, spacing } from '../theme/theme';

// Liste des repas d'une catégorie (paramètre `category` passé via la navigation).
export default function MealsByCategoryScreen({ route, navigation }) {
  const { category } = route.params;
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    try {
      setError(null);
      const data = await getMealsByCategory(category);
      setMeals(data);
    } catch (e) {
      setError(e.message || 'Impossible de charger les repas.');
    } finally {
      setLoading(false);
    }
  }, [category]);

  useEffect(() => {
    load();
  }, [load]);

  if (loading) return <Loader label={`Repas — ${category}`} />;
  if (error)
    return (
      <ErrorView
        message={error}
        onRetry={() => {
          setLoading(true);
          load();
        }}
      />
    );

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <FlatList
        data={meals}
        keyExtractor={(item) => item.idMeal}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.count}>{meals.length} recettes</Text>
          </View>
        }
        ListEmptyComponent={
          <EmptyState
            icon="fast-food-outline"
            title="Aucun repas trouvé"
            subtitle="Cette catégorie ne contient pas de résultats."
          />
        }
        renderItem={({ item }) => (
          <MealCard
            meal={item}
            onPress={() =>
              navigation.navigate('MealDetail', { id: item.idMeal })
            }
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  list: {
    paddingVertical: spacing.sm,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.xs,
  },
  count: {
    color: colors.textMuted,
    fontWeight: '600',
    fontSize: 14,
  },
});
