import React from 'react';
import { TouchableOpacity, Image, Text, StyleSheet } from 'react-native';
import { colors, spacing, radius, shadow } from '../theme/theme';

// Carte d'une catégorie (image + titre), affichée dans une grille à 2 colonnes.
export default function CategoryCard({ category, onPress }) {
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.85} onPress={onPress}>
      <Image
        source={{ uri: category.strCategoryThumb }}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.title}>{category.strCategory}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    padding: spacing.md,
    margin: spacing.sm,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    ...shadow,
  },
  image: {
    width: '100%',
    height: 90,
    marginBottom: spacing.sm,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
  },
});
