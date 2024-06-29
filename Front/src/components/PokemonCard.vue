<template>
  <v-card @click="goToDetails" class="pokemon-card">
    <v-card-title>
      {{ pokemon.name }}
    </v-card-title>
    <v-card-subtitle>ID: {{ pokemon.id }}</v-card-subtitle>
    <v-img :src="pokemon.sprites.front_default" height="200px"></v-img>
    <v-card-subtitle>Price: ${{ getPokemonPrice() }}</v-card-subtitle>
  </v-card>
</template>

<script setup>
import { useRouter } from 'vue-router';
//import { defineProps } from 'vue';

const props = defineProps({
  pokemon: {
    type: Object,
    required: true,
  },
});

const router = useRouter();

const goToDetails = () => {
  router.push(`/details/${props.pokemon.id}`);
};

const getPokemonPrice = () => {
  if (props.pokemon.stats) {
    const hpStat = props.pokemon.stats.find(stat => stat.stat.name === 'hp');
    if (hpStat) {
      return hpStat.base_stat; // Retourne la base_stat de la statistique "hp" si elle est trouvée
    }
  }
  return 'N/A'; // Retourne 'N/A' si la statistique "hp" n'est pas trouvée ou si props.pokemon.stats est vide ou non défini
};
</script>

<style scoped>
/* Ajoutez du style si nécessaire */
.pokemon-card {
  cursor: pointer; /* Ajoute le curseur pointer pour indiquer que la carte est cliquable */
}
</style>

