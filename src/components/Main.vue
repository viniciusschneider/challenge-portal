<template>
  <v-main>
    <v-container app>
      <Snackbar />
      <router-view />
    </v-container>
  </v-main>
</template>
<script lang="ts">
import Vue from "vue";
import Snackbar from "@/components/Snackbar.vue";

export default Vue.extend({
  components: { Snackbar },
});
</script>
