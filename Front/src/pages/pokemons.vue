<template>
    <v-container fluid>
      <!-- Champ de recherche -->
      <v-row justify="center">
        <v-col cols="12" sm="8" md="6">
          <v-text-field
            v-model="searchQuery"
            label="Chercher Pokémon par ID ou Nom"
            outlined
            clearable
            @input="search"
            @click:clear="resetSearch">
            <!-- icône de recherche -->
            <template #append-inner>
              <v-icon>mdi-magnify</v-icon>
            </template>
          </v-text-field>
        </v-col>
      </v-row>
      <!-- Composant de pagination -->
      <v-row justify="center">
        <v-col cols="12" class="text-center">
          <v-pagination
            v-if="totalPages > 1"
            v-model="currentPage"
            :length="totalPages"
          ></v-pagination>
        </v-col>
      </v-row>
  
      <!-- Affichage de l'indicateur de progression pendant le chargement -->
      <v-row justify="center">
        <v-col cols="12" class="text-center" v-if="pokemonStore.loading">
          <v-progress-circular indeterminate color="primary"></v-progress-circular>
        </v-col>
      </v-row>
  
      <!-- Affichage des cartes Pokémon une fois les données chargées -->
      <v-row justify="center">
        <v-col cols="12" sm="6" md="3" v-for="pokemon in paginatedPokemons" :key="pokemon.id">
          <PokemonCard :pokemon="pokemon" />
        </v-col>
      </v-row>
    </v-container>
  </template>
  <!-- Gestion du loading des pokemons en se basant sur les données sauvegardées dans le pokemonStore-->
  <script setup>
  import { ref, computed, onMounted, watch } from "vue";
  import { usePokemonStore } from '@/stores/pokemonStore';
  import PokemonCard from "@/components/PokemonCard.vue";
  
  const pokemonStore = usePokemonStore();
  
  const searchQuery = ref("");
  const currentPage = ref(1);
  const pokemonsPerPage = ref(72);
  
  const totalPages = computed(() => Math.ceil(pokemonStore.pokemons.length / pokemonsPerPage.value));
  const paginatedPokemons = computed(() => {
    const start = (currentPage.value - 1) * pokemonsPerPage.value;
    const end = start + pokemonsPerPage.value;
    return pokemonStore.pokemons.slice(start, end);
  });
  
  const search = () => {
    pokemonStore.searchPokemons(searchQuery.value);
    currentPage.value = 1;
  };
  
  const resetSearch = () => {
    searchQuery.value = '';
    pokemonStore.resetSearch();
  };
  
  onMounted(() => {
    pokemonStore.loadPokemons();
  });
  
  watch(searchQuery, search);
  
  </script>
  
  <style scoped>
  /* Ajoutez du style si nécessaire */
  </style>
  