// src/main.ts

import { createApp } from 'vue';
import App from './App.vue';
import { registerPlugins } from '@/plugins';
import  { checkTokenAndSetUser } from '@/middlewares/checkTokenAndSetUser';

const app = createApp(App);

registerPlugins(app);
// Vérifier et définir l'utilisateur au démarrage de l'application
checkTokenAndSetUser();

app.mount('#app');
