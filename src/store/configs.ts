import { IConfigs } from "@/interfaces/configs.interface";
import { ITypeSport } from "@/interfaces/type-sport.interface";
import { ActionContext } from "vuex";
import teamsService from '@/services/teams.service';
import axios, { CancelTokenSource } from "axios";

const state: IConfigs = {
  typesSport: [],
  typesSportCancelTokenSource: null
};

export default {
  namespaced: true,
  state,
  mutations: {
    setTypesSport(state: IConfigs, payload: ITypeSport[]) {
      state.typesSport = payload;
    },
    setTypesSportCancelTokenSource(state: IConfigs, payload: CancelTokenSource) {
      state.typesSportCancelTokenSource = payload;
    }
  },
  getters: {
    typesSport(state: IConfigs): ITypeSport[] {
      return state.typesSport;
    },
  },
  actions: {
    async getTypesSport({ commit, state: { typesSportCancelTokenSource } }: ActionContext<IConfigs, any>) {
      if (typesSportCancelTokenSource)
        typesSportCancelTokenSource.cancel();

      let axiosSource = axios.CancelToken.source();
      commit('setTypesSportCancelTokenSource', axiosSource);

      try {
        const typesSport = await teamsService.getTypesSport(axiosSource.token);
        commit('setTypesSport', typesSport);
      } catch (e) {

      }
    }
  }
};
