<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        
        <v-tabs v-model="activeTab">
          <v-tab key="login">Login</v-tab>
          <v-tab key="register">Register</v-tab>
        </v-tabs>

        
        <v-card>
          <v-card-text>
            
            <v-form v-if="activeTab === 0" @submit.prevent="login" ref="loginForm">
              <v-text-field v-model="loginUsername" label="Email" :rules="emailRules" required></v-text-field>
              <v-text-field v-model="loginPassword" label="Password" type="password" :rules="passwordRules" required></v-text-field>
              <v-btn type="submit" color="primary">Login</v-btn>
            </v-form>

            
            <v-form v-else-if="activeTab === 1" @submit.prevent="register" ref="registerForm">
               <v-text-field v-model="registerUsername" label="Email" :rules="emailRules" required></v-text-field>
               <v-text-field v-model="registerPassword" label="Password" type="password" :rules="passwordRules" required></v-text-field>
               <v-text-field v-model="confirmPassword" label="Confirm Password" type="password" :rules="confirmPasswordRules" required></v-text-field>
               <v-text-field v-model="registerFirstName" label="First Name"></v-text-field>
               <v-text-field v-model="registerLastName" label="Last Name"></v-text-field>
               <v-text-field v-model="registerPhoneNumber" label="Phone Number"></v-text-field>
               <v-btn type="submit" color="primary">Register</v-btn>
           </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/userStore';
import axios from 'axios';
import VueJwtDecode from 'vue-jwt-decode';

const router = useRouter();
const userStore = useUserStore();

const activeTab = ref(0);
const loginUsername = ref('');
const loginPassword = ref('');
const registerUsername = ref('');
const registerPassword = ref('');
const confirmPassword = ref('');
const registerFirstName = ref('');
const registerLastName = ref('');
const registerPhoneNumber = ref('');
const loginForm = ref();
const registerForm = ref();

const emailRules = [
  v => !!v || 'Email is required',
  v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
];

const passwordRules = [
  v => !!v || 'Password is required',
  v => (v && v.length >= 6) || 'Password must be at least 6 characters',
];

const confirmPasswordRules = [
  v => !!v || 'Password confirmation is required',
  v => v === registerPassword.value || 'Passwords must match',
];

const firstNameRules = [
  v => !!v || 'First Name is required',
];

const lastNameRules = [
  v => !!v || 'Last Name is required',
];

const phoneNumberRules = [
  v => !!v || 'Phone Number is required',
  v => /^\d{10}$/.test(v) || 'Phone Number must be a valid 10-digit number',
];

const login = async () => {
  if (loginForm.value.validate()) {
    try {
      const response = await axios.post('http://localhost:3011/pokemonlogin', {
        //const response = await axios.post('http://localhost:3010/loginMongoose', {
        email: loginUsername.value,
        password: loginPassword.value
      });

      console.log('Server Response:', response.data);

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        const decodedToken = VueJwtDecode.decode(response.data.token);
        userStore.setUser({ username: decodedToken.username });

        if (loginForm.value) {
          loginForm.value.reset();
        }
        router.push('/Membres'); // Redirige vers la page membres après connexion
      } else {
        console.error('Server did not return a token');
        alert('Invalid email or password');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred during login. Please try again later.');
    }
  }
};

const register = async () => {
  if (registerForm.value.validate()) {
    try {
      const requestData = {
        email: registerUsername.value,
        password: registerPassword.value,
        nom: registerFirstName.value,
        prenom: registerLastName.value,
        numeroTel: parseInt(registerPhoneNumber.value, 10)
      };

      console.log('Sending request with data:', requestData);
      const response = await axios.post('http://localhost:3011/registerpokemon', requestData);
     // const response = await axios.post('http://localhost:3010/registerMongoose', requestData);
      if (response.status === 201 && response.data) {
        console.log('User created successfully:', response.data);
        alert("Merci de vous être enregistré, veuillez vous connecter");
        if (registerForm.value) {
          registerForm.value.reset();
        }
        activeTab.value = 0;// Redirige vers la tab de login après enregistrement
      } else {
        console.error('Server did not return a valid response');
      }
    } catch (error) {
      console.error('Error during registration:', error);

      if (error.response && error.response.status && error.response.data && error.response.data.message) {
        console.error('Error message from server:', error.response.data.message);
        alert(error.response.data.message);
      } else {
        console.error('An unknown error occurred during registration');
        alert('An unknown error occurred during registration');
      }
    }
  }
};
</script>
