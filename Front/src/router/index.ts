import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '@/pages/accueil.vue';
import Login from '@/pages/Login.vue';
import Pokemon from '@/pages/pokemons.vue';
import Membres from '@/pages/Membres.vue';
import Cart from '@/pages/carte.vue';
import { authMiddleware } from '@/middlewares/authMiddleware'; 


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/accueil',
    name: 'Accueil',
    component: Home,
    //meta: { requiresAuth: true },
  },
  {
    path: '/Membres',
    name: 'Membres',
    component: Membres,
    meta: { requiresAuth: true }, // Cette route nécessite une authentification
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/pokemon',
    name: 'Pokemon',
    component: Pokemon,
  },
  {
    path: '/details/:pokemonId',
    name: 'PokemonDetails',
    meta: { requiresAuth: true }, // Cette route nécessite une authentification
    component: () => import('@/pages/details.vue'), // Chargement dynamique du composant
    props: true, // Les paramètres de la route sont passés en tant que props
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), // Utilisation de l'historique HTML5 pour des URLs propres
  routes,
});
// Utiliser le middleware de navigation
router.beforeEach(authMiddleware);

export default router;
