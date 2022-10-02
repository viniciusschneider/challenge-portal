import Vuex, { Store } from 'vuex';
import { storeConfig } from '@/store/index';
import { IState } from '@/interfaces/state.interface';
import { cloneDeep } from 'lodash';
import { ITypeSport } from '@/interfaces/type-sport.interface';
import axios from 'axios';
import { IUserAddress } from '@/interfaces/user-address.interface';

describe('store.configs', () => {
  let store: Store<IState>;
  let actions: any;

  beforeEach(() => {
    actions = {
      getUserAddress: jest.fn(),
      getTypesSport: jest.fn()
    };
    const _storeConfig = cloneDeep(storeConfig);
    _storeConfig.modules.configs.actions = actions;
    store = new Vuex.Store<IState>(_storeConfig);
  });

  it('increments "configs.typesSport.length" when "configs/setTypesSport" is commited', () => {
    store.commit('configs/setTypesSport', [
      { id: 1, name: 'test' }
    ] as ITypeSport[]);
    expect(store.state.configs.typesSport.length).toEqual(1);
  });

  it('check if "configs.setTypesSportCancelTokenSource" is not null when "configs/setTypesSportCancelTokenSource" is commited', () => {
    const cancelToken = axios.CancelToken.source();
    store.commit('configs/setTypesSportCancelTokenSource', cancelToken);
    expect(store.state.configs.typesSportCancelTokenSource).not.toEqual(null);
  });

  it('increments "configs.address.length" when "configs/setUserAddress" is commited', () => {
    store.commit('configs/setUserAddress', [
      {
        cep: '00000000',
        city: 'test',
        complement: '',
        id: 1,
        name: 'test',
        neighborhood: 'test',
        number: 2,
        state: 'test',
        street: 'test'
      }
    ] as IUserAddress[]);
    expect(store.state.configs.address.length).toEqual(1);
  });

  it('check if "configs.setAddressCancelTokenSource" is not null when "configs/setAddressCancelTokenSource" is commited', () => {
    const cancelToken = axios.CancelToken.source();
    store.commit('configs/setAddressCancelTokenSource', cancelToken);
    expect(store.state.configs.addressCancelTokenSource).not.toEqual(null);
  });

  it('check if "configs."dispatches "configs/getUserAddress" when input event value is "input"', () => {
    store.dispatch('configs/getUserAddress');
    expect(actions.getUserAddress).toHaveBeenCalled();
  });
});
