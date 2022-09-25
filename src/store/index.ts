import { IState } from '@/interfaces/state.interface';
import configs from '@/store/configs';
import matches from '@/store/matches';
import notifications from '@/store/notifications';
import teams from '@/store/teams';
import ui from '@/store/ui';
import user from '@/store/user';
import Vue from 'vue';
import Vuex from 'vuex';
import { initialState as configsInitialState } from '@/store/configs';
import { initialState as matchesInitialState } from '@/store/matches';
import { initialState as notificationsInitialState } from '@/store/notifications';
import { initialState as teamsInitialState } from '@/store/teams';
import { initialState as uiInitialState } from '@/store/ui';
import { initialState as userInitialState } from '@/store/user';

Vue.use(Vuex);

export default new Vuex.Store<IState>({
  modules: {
    configs,
    matches,
    notifications,
    teams,
    ui,
    user
  },
  mutations: {
    reset(state: IState) {
      localStorage.clear();

      state.configs = configsInitialState();
      state.matches = matchesInitialState();
      state.notifications = notificationsInitialState();
      state.teams = teamsInitialState();
      state.ui = uiInitialState();
      state.user = {
        ...userInitialState(),
        accessToken: {
          token: null
        }
      };
    }
  }
});
