<template>
  <v-main>
    <v-container app>
      <Snackbar />
      <router-view />
    </v-container>
  </v-main>
</template>

<script lang="ts">
import Snackbar from '@/components/Snackbar.vue'
import Vue from 'vue'

export default Vue.extend({
  components: { Snackbar }
})
</script>
