
import { defineStore } from 'pinia';
import fetchPokemonById from "@/services/pokemon.service";

export const usePokemonStore = defineStore({
  id: 'pokemon',
  state: () => ({
    pokemons: [],
    originalPokemons: [],
    loading: false,
  }),
  actions: {
    async loadPokemons() {
      if (this.pokemons.length > 0) {
        return; // Si les Pokémon sont déjà chargés, ne rien faire
      }

      this.loading = true;

      try {
        const promises = [];
        for (let i = 1; i <= 1025; i++) {
          promises.push(fetchPokemonById(i));
        }
        const results = await Promise.all(promises);
        this.pokemons = results;
        this.originalPokemons = results.slice();
      } catch (error) {
        console.error('Failed to load Pokémon:', error);
        this.pokemons = [];
      } finally {
        this.loading = false;
      }
    },
    resetSearch() {
      this.pokemons = this.originalPokemons.slice();
    },
    searchPokemons(query) {
      if (!query) {
        this.resetSearch();
        return;
      }
      const searchValue = query.toLowerCase();
      this.pokemons = this.originalPokemons.filter(pokemon =>
        pokemon.name.toLowerCase().includes(searchValue) ||
        pokemon.id.toString() === searchValue
      );
    },
  }
});
