# 🍽️ TheMealDB — Mini Application Mobile (React Native / Expo)

Mini application mobile complète développée avec **React Native (Expo)**, consommant l'API publique **[TheMealDB](https://www.themealdb.com/api.php)**.

Ce projet répond à l'énoncé : plusieurs écrans avec navigation, consommation d'une API REST, gestion d'état et interactions, interface propre et moderne.

---

## ✨ Fonctionnalités

- **Catégories** — liste de toutes les catégories de repas (`/categories.php`), en grille à 2 colonnes, avec *pull-to-refresh*.
- **Repas par catégorie** — liste filtrée des plats d'une catégorie (`/filter.php?c=`).
- **Recherche** — recherche d'un plat par nom (`/search.php?s=`).
- **Détail d'une recette** — image, catégorie, origine, ingrédients + mesures, instructions, liens YouTube / source (`/lookup.php?i=`).
- Gestion complète des états : **chargement**, **erreur (avec bouton Réessayer)**, **liste vide**.

---

## 🧭 Navigation

Deux onglets (bottom tabs), chacun contenant sa propre pile (stack) :

```
Tab "Catégories"  →  Categories  →  MealsByCategory  →  MealDetail
Tab "Recherche"   →  Search      →  MealDetail
```

- `@react-navigation/bottom-tabs`
- `@react-navigation/native-stack`

---

## 🗂️ Structure du projet

```
themealdb-app/
├── App.js                       # Point d'entrée + navigation
├── app.json                     # Configuration Expo
├── babel.config.js
├── package.json
└── src/
    ├── api/
    │   └── mealApi.js           # Client REST TheMealDB
    ├── components/
    │   ├── CategoryCard.js
    │   ├── MealCard.js
    │   ├── Loader.js
    │   ├── ErrorView.js
    │   └── EmptyState.js
    ├── screens/
    │   ├── CategoriesScreen.js
    │   ├── MealsByCategoryScreen.js
    │   ├── SearchScreen.js
    │   └── MealDetailScreen.js
    └── theme/
        └── theme.js             # Couleurs, espacements, ombres
```

---

## 🚀 Lancer le projet

> Prérequis : **Node.js 18+** et l'application **Expo Go** sur ton téléphone (ou un émulateur Android / iOS).

```bash
# 1. Installer les dépendances
npm install

# 2. (recommandé) aligner les versions natives sur le SDK Expo
npx expo install --fix

# 3. Démarrer le serveur de développement
npx expo start
```

Scanne ensuite le QR code avec **Expo Go**, ou appuie sur `a` (Android) / `i` (iOS) / `w` (web) dans le terminal.

---

## 🛠️ Stack technique

| Élément          | Technologie                          |
| ---------------- | ------------------------------------ |
| Framework        | React Native + Expo (SDK 51)         |
| Navigation       | React Navigation (tabs + stack)      |
| Données          | API REST TheMealDB (`fetch`)         |
| Gestion d'état   | Hooks React (`useState`, `useEffect`) |
| Icônes           | `@expo/vector-icons` (Ionicons)      |

---

## 👤 Auteur

Projet réalisé dans le cadre d'un module de développement mobile.
