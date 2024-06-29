<!-- JOUT DE LA GESTION DES QUANTITÉS-->
<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" sm="10" md="8">
        <v-card v-if="cartItems.length" class="cart-card">
          <v-card-title class="d-flex justify-space-between align-center">
            <span>{{ userFullName }}'s Cart</span>
            <!-- Champ pour afficher le prix total -->
            <v-card class="total-card" v-if="cartItems.length">
              <v-card-text class="text-h6">
                Total: ${{ totalAmount.toFixed(2) }}
              </v-card-text>
            </v-card>
          </v-card-title>
          <v-divider></v-divider>
          <v-row justify="center">
            <v-col cols="12" sm="6" md="3" v-for="pokemon in cartItems" :key="pokemon.id">
              <PokemonCard :pokemon="pokemon" />
              <div class="quantity-controls">
                <span>Quantity: {{ pokemon.quantity }}</span>
              </div>
              <v-btn color="red" @click="confirmRemove(pokemon.id)">Remove</v-btn>
            </v-col>
          </v-row>
        </v-card>
        <v-alert v-else type="info">Le panier d'achat de {{ userFullName }} est vide</v-alert>
      </v-col>
    </v-row>

    <!-- Confirmation dialog -->
    <v-dialog v-model="dialog" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">Confirm Removal</v-card-title>
        <v-card-text>
          Étes-vous sure de vouloir retirer cet item du panier ?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false">Cancel</v-btn>
          <v-btn color="red darken-1" text @click="confirmRemoval">Relacher</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useCartStore } from '@/stores/cartStore';
import { useUserStore } from '@/stores/userStore';
import PokemonCard from '@/components/PokemonCard.vue';

const cartStore = useCartStore();
const userStore = useUserStore();
const dialog = ref(false); // State for confirmation dialog
const selectedPokemonId = ref(null); // State for selected Pokemon ID

const cartItems = computed(() => cartStore.items);

const userFullName = computed(() => {
  return userStore.user ? `${userStore.user.firstName} ${userStore.user.lastName}` : 'Invité(e)';
});

// Utiliser le getter totalPrice du store
const totalAmount = computed(() => cartStore.totalPrice);

const confirmRemove = (pokemonId) => {
  selectedPokemonId.value = pokemonId;
  dialog.value = true;
};

const confirmRemoval = () => {
  if (selectedPokemonId.value !== null) {
    cartStore.removeFromCart(selectedPokemonId.value);
    dialog.value = false;
    selectedPokemonId.value = null;
  }
};

onMounted(() => {
  if (userStore.user) {
    cartStore.initializeCart();
  }
});
</script>

<style scoped>
.cart-card {
  max-width: 600px;
  margin: auto;
  padding: 16px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  position: relative;
}

.total-card {
  padding: 8px;
  background-color: #333; /* Couleur de fond plus foncée */
  color: #fff; /* Couleur du texte en blanc */
  border-radius: 4px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  min-width: 100px;
  text-align: center;
}

.text-h6 {
  font-size: 16px;
  font-weight: bold;
}

.quantity-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
}

.quantity-controls span {
  margin: 0 8px;
  font-size: 16px;
}
</style>