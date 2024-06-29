<!--template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
  //
</script-->

<template>
  <v-app>
    <Header /> <!-- Inclure le composant Header.vue pour qu'il apparait dans toute la app -->
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
import Header from '@/components/HeaderProf.vue';
</script>

