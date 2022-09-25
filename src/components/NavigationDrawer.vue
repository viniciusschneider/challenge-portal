<template>
  <v-navigation-drawer app left v-model="open" clipped>
    <v-list>
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/women/85.jpg"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{ user.name }}</v-list-item-title>
          <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list nav dense>
      <v-list-item-group color="primary">
        <v-list-item
          v-for="(page, key) in pages"
          :key="key"
          link
          :to="{ name: page.link }"
        >
          <v-list-item-icon>
            <v-icon>{{ page.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ page.title }}</v-list-item-title>
        </v-list-item>
      </v-list-item-group>
    </v-list>
    <v-switch
      class="ps-3"
      label="Dark"
      v-model="$vuetify.theme.dark"
    ></v-switch>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import { IUser } from '@/interfaces/user.interface';
import { UiModule, UserModule } from '@/store/namespaces';
import Vue from 'vue';
import { EnumRouteNames } from '@/router';

@Component
export default class NavigationDrawer extends Vue {
  @UiModule.Mutation('setDrawer') setDrawer: (patload: boolean) => void;
  @UiModule.Getter('getDrawer') drawer: boolean;
  @UserModule.Getter('getUser') user: IUser;

  pages = [
    {
      icon: 'mdi-account-group-outline',
      title: 'Times',
      link: EnumRouteNames.TEAMS_LIST
    }
  ];

  get open(): boolean {
    return this.drawer;
  }

  set open(value: boolean) {
    this.setDrawer(value);
  }
}
</script>
