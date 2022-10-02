import { ActionContext } from 'vuex';
import { IStateUser } from '@/interfaces/state-user.interface';
import { IUser } from '@/interfaces/user.interface';
import { IAccessToken } from '@/interfaces/access-token.interface';

const APP_TOKEN = 'APP_TOKEN';

export const initialState: () => IStateUser = () => ({
  accessToken: {
    token: localStorage[APP_TOKEN] || ''
  },
  user: null
});

export default {
  namespaced: true,
  state: initialState(),
  getters: {
    getUser(state: IStateUser): IUser {
      return state.user;
    },
    getAccessToken(state: IStateUser): IAccessToken {
      return state.accessToken;
    }
  },
  mutations: {
    setUser(state: IStateUser, payload: IUser): void {
      state.user = payload;
    },
    setAccessToken(state: IStateUser, accessToken: IAccessToken): void {
      state.accessToken = accessToken;
    }
  },
  actions: {
    setAccessToken(
      store: ActionContext<IStateUser, any>,
      accessToken: IAccessToken
    ): void {
      store.commit('setAccessToken', accessToken);

      if (accessToken.token) {
        const user = JSON.parse(
          decodeURIComponent(escape(atob(accessToken.token.split('.')[1])))
        );
        store.commit('setUser', user);
      }

      localStorage[APP_TOKEN] = accessToken.token;
    }
  }
};
