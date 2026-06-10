import React, { useState, useCallback } from 'react';
import {
  View,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Keyboard,
  Text,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { searchMealsByName } from '../api/mealApi';
import MealCard from '../components/MealCard';
import ErrorView from '../components/ErrorView';
import EmptyState from '../components/EmptyState';
import { colors, spacing, radius } from '../theme/theme';

// Écran de recherche par nom de repas.
export default function SearchScreen({ navigation }) {
  const [query, setQuery] = useState('');
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const onSearch = useCallback(async () => {
    const term = query.trim();
    if (!term) return;
    Keyboard.dismiss();
    setLoading(true);
    setError(null);
    setHasSearched(true);
    try {
      const data = await searchMealsByName(term);
      setMeals(data);
    } catch (e) {
      setError(e.message || 'La recherche a échoué.');
    } finally {
      setLoading(false);
    }
  }, [query]);

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <View style={styles.searchBar}>
        <Ionicons name="search" size={20} color={colors.textMuted} />
        <TextInput
          style={styles.input}
          placeholder="Rechercher un plat (ex : Arrabiata)"
          placeholderTextColor={colors.textMuted}
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={onSearch}
          returnKeyType="search"
          autoCapitalize="none"
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={() => setQuery('')}>
            <Ionicons name="close-circle" size={20} color={colors.textMuted} />
          </TouchableOpacity>
        )}
      </View>

      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.85}
        onPress={onSearch}
      >
        <Ionicons name="search" size={18} color={colors.white} />
        <Text style={styles.buttonText}>Rechercher</Text>
      </TouchableOpacity>

      {error ? (
        <ErrorView message={error} onRetry={onSearch} />
      ) : loading ? (
        <ActivityIndicator
          style={{ marginTop: spacing.xl }}
          size="large"
          color={colors.primary}
        />
      ) : (
        <FlatList
          data={meals}
          keyExtractor={(item) => item.idMeal}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <MealCard
              meal={item}
              onPress={() =>
                navigation.navigate('MealDetail', { id: item.idMeal })
              }
            />
          )}
          ListEmptyComponent={
            hasSearched ? (
              <EmptyState
                icon="sad-outline"
                title="Aucun résultat"
                subtitle="Essaie un autre nom de plat."
              />
            ) : (
              <EmptyState
                icon="restaurant-outline"
                title="Cherche ta recette"
                subtitle="Saisis le nom d'un plat puis lance la recherche."
              />
            )
          }
        />
      )}
    </SafeAreaView>
  );
}

// Styles de l'écran de recherche.
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.surface,
    marginHorizontal: spacing.lg,
    marginTop: spacing.lg,
    paddingHorizontal: spacing.md,
    height: 50,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.primary,
    marginHorizontal: spacing.lg,
    marginTop: spacing.md,
    height: 48,
    borderRadius: radius.md,
  },
  buttonText: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 15,
  },
  list: {
    paddingVertical: spacing.md,
    flexGrow: 1,
  },
});
