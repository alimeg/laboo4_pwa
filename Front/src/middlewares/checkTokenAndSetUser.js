import { useUserStore } from '@/stores/userStore';
import { useCartStore } from '@/stores/cartStore';
import VueJwtDecode from 'vue-jwt-decode';

export const checkTokenAndSetUser = () => {
  const userStore = useUserStore();
  const cartStore = useCartStore();
  const token = localStorage.getItem('token');

  if (token) {
    try {
      const decodedToken = VueJwtDecode.decode(token);
      //console.log(decodedToken.exp * 1000)
      // Vérifier si le token a expiré
      if (decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem('token');
        alert("Cet espace est résérvé, veuillez vous authentifier")
        return false; // Token expiré
      } else {
        userStore.setUser({ userId: decodedToken.userId, firstName: decodedToken.firstName, lastName: decodedToken.lastName });
        cartStore.initializeCart(); // Initialiser le panier pour l'utilisateur connecté
        return true; // Utilisateur authentifié
      }
    } catch (error) {
      console.error('Invalid token:', error);
      localStorage.removeItem('token');
      return false; // Token invalide
    }
  }
  return false; // Pas de token
};
