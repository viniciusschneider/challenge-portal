import { IConfigs } from '@/interfaces/configs.interface'
import { ITypeSport } from '@/interfaces/type-sport.interface'
import { ActionContext } from 'vuex'
import teamsService from '@/services/teams.service'
import addressService from '@/services/address.service'
import axios, { CancelTokenSource } from 'axios'
import { IUserAddress } from '@/interfaces/user-address.interface'

export const initialState: () => IConfigs = () => ({
  address: [],
  addressCancelTokenSource: null,
  typesSport: [],
  typesSportCancelTokenSource: null
})

export default {
  namespaced: true,
  state: initialState(),
  mutations: {
    setTypesSport(state: IConfigs, payload: ITypeSport[]): void {
      state.typesSport = payload
    },
    setTypesSportCancelTokenSource(
      state: IConfigs,
      payload: CancelTokenSource
    ): void {
      state.typesSportCancelTokenSource = payload
    },
    setUserAddress(state: IConfigs, payload: IUserAddress[]): void {
      state.address = payload
    },
    setAddressCancelTokenSource(
      state: IConfigs,
      payload: CancelTokenSource
    ): void {
      state.addressCancelTokenSource = payload
    }
  },
  getters: {
    typesSport(state: IConfigs): ITypeSport[] {
      return state.typesSport
    },
    userAddress(state: IConfigs): ITypeSport[] {
      return state.address
    }
  },
  actions: {
    async getTypesSport({
      commit,
      state: { typesSportCancelTokenSource }
    }: ActionContext<IConfigs, any>): Promise<void> {
      if (typesSportCancelTokenSource) typesSportCancelTokenSource.cancel()

      const axiosSource = axios.CancelToken.source()
      commit('setAddressCancelTokenSource', axiosSource)

      try {
        const typesSport = await teamsService.getTypesSport(axiosSource.token)
        commit('setTypesSport', typesSport)
      } catch (e) {
        if (axios.isCancel(e)) return
        console.error(e)
      }
    },
    async getUserAddress({
      commit,
      state: { addressCancelTokenSource }
    }: ActionContext<IConfigs, any>): Promise<void> {
      if (addressCancelTokenSource) addressCancelTokenSource.cancel()

      const axiosSource = axios.CancelToken.source()
      commit('setTypesSportCancelTokenSource', axiosSource)

      try {
        const userAddress = await addressService.userAddress(axiosSource.token)
        commit('setUserAddress', userAddress)
      } catch (e) {
        if (axios.isCancel(e)) return
        console.error(e)
      }
    }
  }
}
