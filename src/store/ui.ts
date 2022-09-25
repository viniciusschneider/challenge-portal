import { IStateUi, IUiSnackbar } from '@/interfaces/state-ui.interface';

export const initialState: () => IStateUi = () => ({
  drawer: false,
  loading: false,
  snackbar: {
    show: false,
    status: 'success',
    text: ''
  }
});

export default {
  namespaced: true,
  state: initialState(),
  mutations: {
    setSnackbar(state: IStateUi, payload: IUiSnackbar): void {
      state.snackbar.show = payload.show !== undefined ? payload.show : true;
      state.snackbar.status = payload.status || 'success';
      state.snackbar.text = payload.text || '';
    },
    setDrawer(state: IStateUi, payload: boolean): void {
      state.drawer = payload;
    },
    genericError(state: IStateUi): void {
      state.snackbar.show = true;
      state.snackbar.status = 'error';
      state.snackbar.text = 'Oops, ocorreu um erro inesperado!';
    },
    closeSnackbar(state: IStateUi): void {
      state.snackbar.show = false;
    },
    setLoading(state: IStateUi, payload: boolean): void {
      document.documentElement.style.overflow = payload ? 'hidden' : 'auto';
      state.loading = payload;
    }
  },
  getters: {
    getDrawer(state: IStateUi): boolean {
      return state.drawer;
    },
    getSnackbar(state: IStateUi): IUiSnackbar {
      return state.snackbar;
    },
    loading(state: IStateUi): boolean {
      return state.loading;
    }
  }
};
