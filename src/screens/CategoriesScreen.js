import React, { useEffect, useState, useCallback } from 'react';
import { Text, FlatList, StyleSheet, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { getCategories } from '../api/mealApi';
import CategoryCard from '../components/CategoryCard';
import Loader from '../components/Loader';
import ErrorView from '../components/ErrorView';
import { colors, spacing } from '../theme/theme';

// Écran d'accueil : affiche toutes les catégories de TheMealDB en grille.
export default function CategoriesScreen({ navigation }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const load = useCallback(async () => {
    try {
      setError(null);
      const data = await getCategories();
      setCategories(data);
    } catch (e) {
      setError(e.message || 'Impossible de charger les catégories.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const onRefresh = () => {
    setRefreshing(true);
    load();
  };

  const onRetry = () => {
    setLoading(true);
    load();
  };

  if (loading) return <Loader label="Chargement des catégories…" />;
  if (error) return <ErrorView message={error} onRetry={onRetry} />;

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.idCategory}
        numColumns={2}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <Text style={styles.heading}>Explore par catégorie</Text>
        }
        renderItem={({ item }) => (
          <CategoryCard
            category={item}
            onPress={() =>
              navigation.navigate('MealsByCategory', {
                category: item.strCategory,
              })
            }
          />
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[colors.primary]}
            tintColor={colors.primary}
          />
        }
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
    paddingHorizontal: spacing.sm,
    paddingBottom: spacing.xl,
  },
  heading: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.text,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.lg,
    paddingBottom: spacing.sm,
  },
});
