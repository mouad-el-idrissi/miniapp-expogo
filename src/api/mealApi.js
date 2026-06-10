// Client REST pour l'API TheMealDB (https://www.themealdb.com/api.php)
// Endpoints utilisés :
//   - Liste des catégories      : /categories.php
//   - Filtrer par catégorie     : /filter.php?c=<categorie>
//   - Rechercher par nom        : /search.php?s=<nom>
//   - Détails d'un repas par id  : /lookup.php?i=<id>

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

async function request(path) {
  const res = await fetch(`${BASE_URL}${path}`);
  if (!res.ok) {
    throw new Error(`Erreur réseau (${res.status})`);
  }
  return res.json();
}

// Retourne la liste de toutes les catégories de repas.
export async function getCategories() {
  const data = await request('/categories.php');
  return data.categories ?? [];
}

// Retourne les repas appartenant à une catégorie donnée.
export async function getMealsByCategory(category) {
  const data = await request(`/filter.php?c=${encodeURIComponent(category)}`);
  return data.meals ?? [];
}

// Recherche des repas par nom (ou fragment de nom).
export async function searchMealsByName(name) {
  const data = await request(`/search.php?s=${encodeURIComponent(name)}`);
  return data.meals ?? [];
}

// Retourne le détail complet d'un repas à partir de son identifiant.
export async function getMealById(id) {
  const data = await request(`/lookup.php?i=${encodeURIComponent(id)}`);
  return data.meals?.[0] ?? null;
}
