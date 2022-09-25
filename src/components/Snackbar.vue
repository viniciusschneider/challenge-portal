<template>
  <v-snackbar top right v-model="snackbar.show" :color="snackbar.status">
    {{ snackbar.text }}
    <template v-slot:action>
      <v-btn text @click="closeSnackbar">
        <v-icon>mdi-close-thick</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import { IUiSnackbar } from '@/interfaces/state-ui.interface'
import { UiModule } from '@/store/namespaces'
import Vue from 'vue'

@Component
export default class Snackbar extends Vue {
  @UiModule.Getter('getSnackbar') snackbar: IUiSnackbar
  @UiModule.Mutation('closeSnackbar') closeSnackbar: () => void
}
</script>
