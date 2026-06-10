import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import CategoriesScreen from './src/screens/CategoriesScreen';
import MealsByCategoryScreen from './src/screens/MealsByCategoryScreen';
import SearchScreen from './src/screens/SearchScreen';
import MealDetailScreen from './src/screens/MealDetailScreen';
import { colors } from './src/theme/theme';

const Tab = createBottomTabNavigator();
const CategoriesStack = createNativeStackNavigator();
const SearchStack = createNativeStackNavigator();

// Options communes aux en-têtes (couleur de marque).
const stackScreenOptions = {
  headerStyle: { backgroundColor: colors.primary },
  headerTintColor: colors.white,
  headerTitleStyle: { fontWeight: '800' },
  contentStyle: { backgroundColor: colors.background },
};

// Pile de l'onglet "Catégories" : Catégories -> Repas -> Détail.
function CategoriesNavigator() {
  return (
    <CategoriesStack.Navigator screenOptions={stackScreenOptions}>
      <CategoriesStack.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{ title: 'Catégories' }}
      />
      <CategoriesStack.Screen
        name="MealsByCategory"
        component={MealsByCategoryScreen}
        options={({ route }) => ({ title: route.params.category })}
      />
      <CategoriesStack.Screen
        name="MealDetail"
        component={MealDetailScreen}
        options={{ title: 'Recette' }}
      />
    </CategoriesStack.Navigator>
  );
}

// Pile de l'onglet "Recherche" : Recherche -> Détail.
function SearchNavigator() {
  return (
    <SearchStack.Navigator screenOptions={stackScreenOptions}>
      <SearchStack.Screen
        name="Search"
        component={SearchScreen}
        options={{ title: 'Recherche' }}
      />
      <SearchStack.Screen
        name="MealDetail"
        component={MealDetailScreen}
        options={{ title: 'Recette' }}
      />
    </SearchStack.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="light" />
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarActiveTintColor: colors.primary,
            tabBarInactiveTintColor: colors.textMuted,
            tabBarStyle: { height: 60, paddingBottom: 8, paddingTop: 6 },
            tabBarLabelStyle: { fontSize: 12, fontWeight: '600' },
            tabBarIcon: ({ color, size }) => {
              const name =
                route.name === 'CategoriesTab' ? 'restaurant' : 'search';
              return <Ionicons name={name} size={size} color={color} />;
            },
          })}
        >
          <Tab.Screen
            name="CategoriesTab"
            component={CategoriesNavigator}
            options={{ title: 'Catégories' }}
          />
          <Tab.Screen
            name="SearchTab"
            component={SearchNavigator}
            options={{ title: 'Recherche' }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
