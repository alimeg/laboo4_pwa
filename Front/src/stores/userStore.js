 
import { defineStore } from 'pinia';

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    user: null,
  }),
  actions: {
    setUser(user) {
      this.user = user;
    },
    clearUser() {
      this.user = null;
      
    },
    logoutUser(){
      this.clearUser()
      localStorage.removeItem('token');
    }
  },
  getters: {
    isAuthenticated: (state) => !!state.user,
    userFullName: (state) => state.user ? `${state.user.firstName} ${state.user.lastName}` : 'Invité'
  }
});

