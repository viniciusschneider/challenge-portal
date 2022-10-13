import { IMatches } from '@/interfaces/matches.interface';
import { IPaginationParams } from '@/interfaces/pagination-params.interface';
import { ITeamItem } from '@/interfaces/teams.interface';
import matchesService from '@/services/matches.service';
import axios, { CancelTokenSource } from 'axios';
import { ActionContext } from 'vuex';
import router, { EnumRouteNames } from '@/router';
import { ITeamMatchesItem } from '@/interfaces/team-matches.interface';
import { IRenderList } from '@/interfaces/render-list.interface';
import { IFindTeams } from '@/interfaces/find-teams.interface';

export const initialState: () => IMatches = () => ({
  team: null,
  teamCancelTokenSource: null,
  listMatches: {
    load: true,
    items: [],
    meta: {
      currentPage: 1,
      itemCount: 0,
      itemsPerPage: 6,
      totalItems: 0,
      totalPages: 1
    }
  },
  teamsMatchesCancelTokenSource: null,
  searchMatches: {
    load: false,
    items: [],
    meta: {
      currentPage: 1,
      itemCount: 0,
      itemsPerPage: 6,
      totalItems: 0,
      totalPages: 1
    }
  },
  searchMatchesCancelTokenSource: null,
  searchFilter: {
    address: '',
    dates: []
  }
});

export default {
  namespaced: true,
  state: initialState(),
  mutations: {
    setLoadSearchMatches(state: IMatches, payload: boolean): void {
      state.searchMatches.load = payload;
    },
    setSearchMatchesCancelTokenSource(
      state: IMatches,
      payload: CancelTokenSource
    ): void {
      state.searchMatchesCancelTokenSource = payload;
    },
    setLoadTeamMatches(state: IMatches, payload: boolean): void {
      state.listMatches.load = payload;
    },
    setListMatchesCancelTokenSource(
      state: IMatches,
      payload: CancelTokenSource
    ): void {
      state.teamsMatchesCancelTokenSource = payload;
    },
    setTeamCancelTokenSource(
      state: IMatches,
      payload: CancelTokenSource
    ): void {
      state.teamCancelTokenSource = payload;
    },
    setListMatches(
      state: IMatches,
      payload: IRenderList<ITeamMatchesItem>
    ): void {
      state.listMatches = {
        ...state.listMatches,
        ...payload
      };
    },
    setTeam(state: IMatches, payload: ITeamItem): void {
      state.team = payload;
    },
    setSearchMatches(
      state: IMatches,
      { items, meta }: IRenderList<ITeamMatchesItem>
    ): void {
      state.searchMatches.items = items;
      state.searchMatches.meta = meta;
    },
    resetSearchMatches(state: IMatches): void {
      state.searchMatches = initialState().searchMatches;
    },
    setSearchFilter(state: IMatches, payload: IFindTeams): void {
      state.searchFilter = payload;
    },
    cancelGetTeamMatches(state: IMatches): void {
      if (state.teamsMatchesCancelTokenSource)
        state.teamsMatchesCancelTokenSource.cancel();
    },
    cancelGetTeam(state: IMatches): void {
      if (state.teamCancelTokenSource) state.teamCancelTokenSource.cancel();
    },
    cancelGetSearchMatches(state: IMatches): void {
      if (state.searchMatchesCancelTokenSource)
        state.searchMatchesCancelTokenSource.cancel();
    }
  },
  getters: {
    loadTeamMatches({ listMatches: { load } }: IMatches): boolean {
      return load;
    },
    team({ team }: IMatches): ITeamItem {
      return team;
    },
    listMatches({ listMatches }: IMatches): IRenderList<ITeamMatchesItem> {
      return listMatches;
    },
    searchMatches({ searchMatches }: IMatches): IRenderList<ITeamMatchesItem> {
      return searchMatches;
    }
  },
  actions: {
    async getSearchMatches(
      {
        commit,
        state: {
          searchFilter: {
            address,
            dates: [startDate, endDate]
          }
        }
      }: ActionContext<IMatches, any>,
      params: IPaginationParams & { teamId: number }
    ): Promise<void> {
      const axiosSource = axios.CancelToken.source();
      commit('setSearchMatchesCancelTokenSource', axiosSource);
      commit('setLoadSearchMatches', true);

      try {
        const searchMatches = await matchesService.searchMatches(
          axiosSource.token,
          {
            ...params,
            address,
            startDate,
            endDate
          }
        );
        commit('setSearchMatches', searchMatches);
      } catch (e) {
        if (axios.isCancel(e)) return;
        console.error(e);
      } finally {
        commit('setLoadSearchMatches', false);
      }
    },
    async getTeamMatches(
      { commit, state: { team } }: ActionContext<IMatches, any>,
      params: IPaginationParams
    ): Promise<void> {
      const axiosSource = axios.CancelToken.source();
      commit('setListMatchesCancelTokenSource', axiosSource);
      commit('setLoadTeamMatches', true);

      try {
        const teamMatches = await matchesService.getTeamMatches(
          axiosSource.token,
          team.id,
          params
        );
        commit('setListMatches', teamMatches);
      } catch (e) {
        if (axios.isCancel(e)) return;
        console.error(e);
      } finally {
        commit('setLoadTeamMatches', false);
      }
    },
    async getTeam(
      { commit }: ActionContext<IMatches, any>,
      teamId: number
    ): Promise<boolean> {
      const axiosSource = axios.CancelToken.source();
      commit('setTeamCancelTokenSource', axiosSource);
      commit('setLoadTeamMatches', true);
      commit('setTeam', null);

      try {
        const team = await matchesService.getTeam(axiosSource.token, teamId);
        commit('setTeam', team);
        return true;
      } catch (e) {
        if (axios.isCancel(e)) return;

        console.error(e);
        router.replace({ name: EnumRouteNames.TEAMS_LIST });
        return false;
      }
    }
  }
};
