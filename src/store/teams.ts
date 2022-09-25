import { ActionContext } from 'vuex'
import teamsService from '@/services/teams.service'
import { ITeamItem, ITeams } from '@/interfaces/teams.interface'
import axios, { CancelTokenSource } from 'axios'
import { IPaginationParams } from '@/interfaces/pagination-params.interface'
import { IRenderList } from '@/interfaces/render-list.interface'

export const initialState: () => ITeams = () => ({
  listTeams: {
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
  teamsListCancelTokenSource: null
})

export default {
  namespaced: true,
  state: initialState(),
  mutations: {
    setListTeams(state: ITeams, { items, meta }: IRenderList<ITeamItem>): void {
      state.listTeams.items = items
      state.listTeams.meta = meta
    },
    setListTeamsCancelTokenSource(
      state: ITeams,
      payload: CancelTokenSource
    ): void {
      state.teamsListCancelTokenSource = payload
    },
    setListTeamsLoad(state: ITeams, payload: boolean): void {
      state.listTeams.load = payload
    },
    cancelGetListTeams(state: ITeams): void {
      if (state.teamsListCancelTokenSource)
        state.teamsListCancelTokenSource.cancel()
    }
  },
  getters: {
    listTeams(state: ITeams): IRenderList<ITeamItem> {
      return state.listTeams
    }
  },
  actions: {
    async getListTeams(
      { commit }: ActionContext<ITeams, any>,
      params: IPaginationParams
    ): Promise<void> {
      const axiosSource = axios.CancelToken.source()
      commit('setListTeamsCancelTokenSource', axiosSource)
      commit('setListTeamsLoad', true)

      try {
        const teams = await teamsService.getTeams(axiosSource.token, params)
        commit('setListTeams', teams)
      } catch (e) {
        if (axios.isCancel(e)) return
        console.error(e)
      } finally {
        commit('setListTeamsLoad', false)
      }
    }
  }
}
