<template>
  <v-app app>
    <Loading v-if="loading" />
    <NavigationDrawer v-if="user" />
    <AppBar v-if="user" />
    <Main />
  </v-app>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import { IAccessToken } from './interfaces/access-token.interface';
import { IUser } from './interfaces/user.interface';
import { namespace } from 'vuex-class';
import AppBar from '@/components/AppBar.vue';
import Main from '@/components/Main.vue';
import NavigationDrawer from '@/components/NavigationDrawer.vue';
import Loading from '@/components/Loading.vue';
import Vue from 'vue';
import { EnumRouteNames } from './router';
import { UiModule } from './store/namespaces';

const UserModule = namespace('user');

@Component({
  components: { AppBar, Loading, Main, NavigationDrawer }
})
export default class App extends Vue {
  @UserModule.Getter('getUser') user: IUser;
  @UserModule.Getter('getAccessToken') getAccessToken: IAccessToken;
  @UserModule.Action('setAccessToken') setAccessToken: (
    payload: IAccessToken
  ) => Promise<void>;
  @UiModule.Getter('loading') loading: boolean;

  mounted(): void {
    if (this.getAccessToken) this.setAccessToken(this.getAccessToken);
    else this.$router.replace(EnumRouteNames.LOGIN);
  }
}
</script>
