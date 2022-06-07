<template>
  <v-snackbar top right v-model="snackbar.show" :color="snackbar.status">
    {{ snackbar.text }}
    <template v-slot:action>
      <v-btn text @click="setSnackbar({ text: '', show: false })">
        <v-icon>mdi-close-thick</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { IUiSnackbar } from "@/interfaces/state-ui.interface";
import { UiModule } from "@/store/namespaces";

@Component
export default class Snackbar extends Vue {
  @UiModule.Getter("getSnackbar") snackbar: IUiSnackbar;
  @UiModule.Mutation("setSnackbar") setSnackbar: any;
}
</script>
