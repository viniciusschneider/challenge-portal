import Vue from 'vue';
import VueRouter, { NavigationGuardNext, Route, RouteConfig } from 'vue-router';
import store from '@/store/index';

Vue.use(VueRouter);

export enum EnumRouteNames {
  LOGIN = 'Login',
  TEAMS_LIST = 'TeamsList',
  TEAMS_CREATE = 'TeamsCreate',
  GAME_SCHEDULE = 'GameSchedule',
  TEAMS_FIND = 'TeamsFind'
}

export const routes: Array<RouteConfig> = [
  {
    path: '/login',
    name: EnumRouteNames.LOGIN,
    component: () => import('../views/Login.vue')
  },
  {
    path: '/teams',
    component: {
      render: (c) => c('router-view')
    },
    children: [
      {
        path: '',
        name: EnumRouteNames.TEAMS_LIST,
        component: () => import('../views/teams/TeamsList.vue')
      },
      {
        path: 'create',
        name: EnumRouteNames.TEAMS_CREATE,
        component: () => import('../views/teams/TeamsCreate.vue')
      },
      {
        path: ':id/game-schedule',
        component: {
          render: (c) => c('router-view')
        },
        children: [
          {
            path: '',
            name: EnumRouteNames.GAME_SCHEDULE,
            component: () => import('../views/teams/GameSchedule.vue')
          },
          {
            path: 'find',
            name: EnumRouteNames.TEAMS_FIND,
            component: () => import('../views/teams/TeamsFind.vue')
          }
        ]
      },
      {
        path: '*',
        redirect: '/teams'
      }
    ]
  },
  {
    path: '*',
    redirect: '/teams'
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to: Route, from: Route, next: NavigationGuardNext<Vue>) => {
  const token = store.state.user.accessToken.token;

  if (to.name !== EnumRouteNames.LOGIN && !token) {
    next({ name: EnumRouteNames.LOGIN });
  } else if (to.path === '/' || (to.name === EnumRouteNames.LOGIN && !!token)) {
    next({ name: EnumRouteNames.TEAMS_LIST });
  } else {
    next();
  }
});

export default router;
