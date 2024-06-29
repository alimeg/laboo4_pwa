import { defineStore } from 'pinia';
import { useUserStore } from '@/stores/userStore';

export const useCartStore = defineStore({
  id: 'cart',
  state: () => ({
    items: []
  }),
  actions: {
    addToCart(pokemon) {
      const existingItem = this.items.find(item => item.id === pokemon.id);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        const hpStat = pokemon.stats.find(stat => stat.stat.name === 'hp');
        const price = hpStat ? hpStat.base_stat : 0;  // Utiliser 0 si le hp n'est pas trouvé
        if (isNaN(price)) {
          console.error(`Invalid price for pokemon: ${pokemon.name}`, pokemon);
        } else {
          this.items.push({ ...pokemon, price: Number(price), quantity: 1 });
        }
      }
      console.log('Items after adding:', this.items);
      this.saveCart();
    },
    
    removeFromCart(pokemonId) {
      const index = this.items.findIndex(item => item.id === pokemonId);
      if (index !== -1) {
        if (this.items[index].quantity > 1) {
          this.items[index].quantity--;
        } else {
          this.items.splice(index, 1);
        }
      }
      console.log('Items after removal:', this.items);
      this.saveCart();
    },
    clearCart() {
      this.items = [];
      console.log('Items after clearing:', this.items);
      this.saveCart();
    },
    saveCart() {
      const userStore = useUserStore();
      if (userStore.user) {
        localStorage.setItem(`cartItems_${userStore.user.userId}`, JSON.stringify(this.items));
      }
    },
    initializeCart() {
      const userStore = useUserStore();
      if (userStore.user) {
        const savedCart = localStorage.getItem(`cartItems_${userStore.user.userId}`);
        this.items = savedCart ? JSON.parse(savedCart) : [];
        console.log('Initialized cart:', this.items);
      }
    }
  },
  getters: {
    cartItems: (state) => state.items,
    cartItemCount: (state) => {
      return state.items.reduce((total, item) => {
        return total + item.quantity;
      }, 0);
    },
    totalPrice: (state) => {
      return state.items.reduce((total, item) => {
        if (isNaN(item.price) || isNaN(item.quantity)) {
          console.error('Invalid item in cart:', item);
          return total;
        }
        return total + (item.price * item.quantity);
      }, 0);
    }
  }
});
