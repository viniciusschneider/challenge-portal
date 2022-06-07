import { ActionContext } from "vuex";
import { IStateUser } from "@/interfaces/state-user.interface";
import { IUser } from "@/interfaces/user.interface";
import { IAccessToken } from "@/interfaces/access-token.interface";
import router from "@/router/index";

const APP_TOKEN = "APP_TOKEN";

const initialState: IStateUser = {
  accessToken: {
    token: localStorage[APP_TOKEN] || "",
  },
  user: null,
};

export default {
  namespaced: true,
  state: initialState,
  getters: {
    getUser(state: IStateUser): IUser {
      return state.user;
    },
    getAccessToken(state: IStateUser): IAccessToken {
      return state.accessToken;
    },
  },
  mutations: {
    setUser(state: IStateUser, payload: IUser) {
      state.user = payload;
    },
    setAccessToken(state: IStateUser, accessToken: IAccessToken) {
      state.accessToken = accessToken;
    },
  },
  actions: {
    setAccessToken(store: ActionContext<IStateUser, any>, accessToken: IAccessToken) {
      store.commit("setAccessToken", accessToken);
      
      if (accessToken.token) {
        const user = JSON.parse(atob(accessToken.token.split(".")[1]));
        store.commit("setUser", user);
      }
      
      localStorage[APP_TOKEN] = accessToken.token;
    },
    logout(store: ActionContext<IStateUser, any>) {
      store.commit('setAccessToken', { token: "" });
      store.commit('setUser', null);
      localStorage.clear();
      router.push({ name: "Login" });
    }
  },
};
