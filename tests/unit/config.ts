import { IState } from '@/interfaces/state.interface';
import { EnumRouteNames, routes } from '@/router';
import { storeConfig } from '@/store';
import { createLocalVue } from '@vue/test-utils';
import { cloneDeep } from 'lodash';
import VueRouter, { NavigationGuardNext, Route } from 'vue-router';
import Vuex from 'vuex';

export default (() => {
  const local = createLocalVue();
  local.use(VueRouter);
  local.use(Vuex);
  const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
  });
  const store = new Vuex.Store<IState>(cloneDeep(storeConfig));

  router.beforeEach(
    (to: Route, from: Route, next: NavigationGuardNext<Vue>) => {
      const token = store.state.user.accessToken.token;

      if (to.name !== EnumRouteNames.LOGIN && !token) {
        next({ name: EnumRouteNames.LOGIN });
      } else if (
        to.path === '/' ||
        (to.name === EnumRouteNames.LOGIN && !!token)
      ) {
        next({ name: EnumRouteNames.TEAMS_LIST });
      } else {
        next();
      }
    }
  );

  return {
    localVue: local,
    store,
    router
  };
})();
