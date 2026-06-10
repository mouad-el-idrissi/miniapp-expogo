import React, { useEffect, useState, useCallback } from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { getMealById } from '../api/mealApi';
import Loader from '../components/Loader';
import ErrorView from '../components/ErrorView';
import { colors, spacing, radius } from '../theme/theme';

// Construit la liste { ingrédient, mesure } à partir des champs strIngredient1..20.
function extractIngredients(meal) {
  const items = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      items.push({
        ingredient: ingredient.trim(),
        measure: (measure || '').trim(),
      });
    }
  }
  return items;
}

// Écran de détail complet d'un repas (image, badges, ingrédients, instructions, liens).
export default function MealDetailScreen({ route }) {
  const { id } = route.params;
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    try {
      setError(null);
      const data = await getMealById(id);
      if (!data) throw new Error('Repas introuvable.');
      setMeal(data);
    } catch (e) {
      setError(e.message || 'Impossible de charger les détails.');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    load();
  }, [load]);

  if (loading) return <Loader label="Chargement de la recette…" />;
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

  const ingredients = extractIngredients(meal);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Image source={{ uri: meal.strMealThumb }} style={styles.hero} />

      <View style={styles.body}>
        <Text style={styles.title}>{meal.strMeal}</Text>

        <View style={styles.badges}>
          {meal.strCategory ? (
            <Badge icon="pricetag" label={meal.strCategory} />
          ) : null}
          {meal.strArea ? (
            <Badge icon="earth" label={meal.strArea} />
          ) : null}
        </View>

        <Text style={styles.sectionTitle}>Ingrédients</Text>
        <View style={styles.ingredientList}>
          {ingredients.map((it, idx) => (
            <View key={idx} style={styles.ingredientRow}>
              <Ionicons
                name="ellipse"
                size={7}
                color={colors.primary}
                style={{ marginTop: 7 }}
              />
              <Text style={styles.ingredientText}>
                <Text style={styles.ingredientName}>{it.ingredient}</Text>
                {it.measure ? `  —  ${it.measure}` : ''}
              </Text>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Préparation</Text>
        <Text style={styles.instructions}>{meal.strInstructions}</Text>

        <View style={styles.actions}>
          {meal.strYoutube ? (
            <LinkButton
              icon="logo-youtube"
              label="Voir la vidéo"
              onPress={() => Linking.openURL(meal.strYoutube)}
            />
          ) : null}
          {meal.strSource ? (
            <LinkButton
              icon="link"
              label="Source"
              onPress={() => Linking.openURL(meal.strSource)}
              outline
            />
          ) : null}
        </View>
      </View>
    </ScrollView>
  );
}

// Badge d'information (catégorie, origine).
function Badge({ icon, label }) {
  return (
    <View style={styles.badge}>
      <Ionicons name={icon} size={14} color={colors.primaryDark} />
      <Text style={styles.badgeText}>{label}</Text>
    </View>
  );
}

// Bouton de lien externe (YouTube / source).
function LinkButton({ icon, label, onPress, outline }) {
  return (
    <TouchableOpacity
      style={[styles.linkBtn, outline && styles.linkBtnOutline]}
      activeOpacity={0.85}
      onPress={onPress}
    >
      <Ionicons
        name={icon}
        size={18}
        color={outline ? colors.primary : colors.white}
      />
      <Text style={[styles.linkBtnText, outline && styles.linkBtnTextOutline]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingBottom: spacing.xl * 2,
  },
  hero: {
    width: '100%',
    height: 260,
  },
  body: {
    padding: spacing.lg,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: colors.text,
  },
  badges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: spacing.md,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.badgeBg,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: 999,
  },
  badgeText: {
    color: colors.primaryDark,
    fontWeight: '700',
    fontSize: 13,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
    marginTop: spacing.xl,
    marginBottom: spacing.sm,
  },
  ingredientList: {
    gap: 6,
  },
  ingredientRow: {
    flexDirection: 'row',
    gap: 10,
  },
  ingredientText: {
    flex: 1,
    fontSize: 15,
    color: colors.text,
    lineHeight: 22,
  },
  ingredientName: {
    fontWeight: '700',
  },
  instructions: {
    fontSize: 15,
    lineHeight: 24,
    color: colors.text,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: spacing.xl,
  },
  linkBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.primary,
    height: 48,
    borderRadius: radius.md,
  },
  linkBtnOutline: {
    backgroundColor: colors.white,
    borderWidth: 1.5,
    borderColor: colors.primary,
  },
  linkBtnText: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 15,
  },
  linkBtnTextOutline: {
    color: colors.primary,
  },
});
