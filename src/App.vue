<template>
  <v-app app>
    <NavigationDrawer v-if="user" />
    <AppBar v-if="user" />
    <Main />
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { namespace } from "vuex-class";
import AppBar from "@/components/AppBar.vue";
import Main from "@/components/Main.vue";
import NavigationDrawer from "@/components/NavigationDrawer.vue";
import { IUser } from "./interfaces/user.interface";

const UserModule = namespace("user");

@Component({
  components: { AppBar, Main, NavigationDrawer },
})
export default class App extends Vue {
  @UserModule.Getter("getUser") user: IUser;
  @UserModule.Getter("getAccessToken") getAccessToken: string;
  @UserModule.Action("setAccessToken") setAccessToken: any;

  mounted() {
    if (this.getAccessToken) this.setAccessToken(this.getAccessToken);
    else this.$router.replace('Login');
  }
}
</script>
