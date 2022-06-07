<template>
  <v-app-bar app clipped-left>
    <div style="width: 100%" class="d-flex justify-space-between">
      <v-app-bar-nav-icon @click="setDrawer(!drawer)"></v-app-bar-nav-icon>
      <v-menu
        bottom
        offset-y
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            dark
            icon
            v-bind="attrs"
            v-on="on"
            color="primary"
          >
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item>
            <div class="py-2 px-3 rounded menu-item" v-ripple @click="logout">
              Sair
            </div>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
  </v-app-bar>
</template>
<script lang="ts">
import { UiModule, UserModule } from "@/store/namespaces";
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component
export default class AppBar extends Vue {
  @UiModule.Mutation("setDrawer") setDrawer: any;
  @UiModule.Getter("getDrawer") drawer: boolean;
  @UserModule.Action("logout") logout: any;
}
</script>
<style scoped>
  .menu-item:hover {
    cursor: pointer;
  }
</style>
