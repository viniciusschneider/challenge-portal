import { IConfigs } from "@/interfaces/configs.interface";
import { ITypeSport } from "@/interfaces/type-sport.interface";
import { ActionContext } from "vuex";
import teamsService from '@/services/teams.service';
import { IListTeams, ITeamItem, ITeams } from "@/interfaces/teams.interface";
import axios, { CancelTokenSource } from 'axios';
import { IPaginationParams } from "@/interfaces/pagination-params.interface";

const state: ITeams = {
  listTeams: {
    load: false,
    items: [],
    meta: {
      currentPage: 1,
      itemCount: 0,
      itemsPerPage: 6,
      totalItems: 0,
      totalPages: 1,
    }
  },
  teamsListCancelTokenSource: null
};

export default {
  namespaced: true,
  state,
  mutations: {
    setListTeams(state: ITeams, payload: IListTeams) {
      state.listTeams = payload;
    },
    setListTeamsCancelTokenSource(state: ITeams, payload: CancelTokenSource) {
      state.teamsListCancelTokenSource = payload;
    },
    setListTeamsLoad(state: ITeams, payload: boolean) {
      state.listTeams.load = payload;
    }
  },
  getters: {
    listTeams(state: ITeams): IListTeams {
      return state.listTeams;
    },
  },
  actions: {
    async getListTeams(
      { commit, state: { teamsListCancelTokenSource } }: ActionContext<ITeams, any>,
      params: IPaginationParams
    ) {
      if (teamsListCancelTokenSource)
        teamsListCancelTokenSource.cancel();

      let axiosSource = axios.CancelToken.source();
      commit('setListTeamsCancelTokenSource', axiosSource);
      commit('setListTeamsLoad', true);

      try {
        const teams = await teamsService.getTeams(axiosSource.token, params);
        commit('setListTeams', teams);
      } catch (e) {
 
      } finally {
        commit('setListTeamsLoad', false);
      }
    }
  }
};
