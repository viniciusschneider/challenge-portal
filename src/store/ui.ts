import { IStateUi, IUiSnackbar } from "@/interfaces/state-ui.interface";

const state: IStateUi = {
  drawer: false,
  snackbar: {
    show: false,
    status: "success",
    text: "",
  },
};

export default {
  namespaced: true,
  state,
  mutations: {
    setSnackbar(state: IStateUi, payload: IUiSnackbar) {
      state.snackbar.show = payload.show !== undefined ? payload.show : true;
      state.snackbar.status = payload.status || "success";
      state.snackbar.text = payload.text || "";
    },
    setDrawer(state: IStateUi, payload: boolean) {
      state.drawer = payload;
    },
  },
  getters: {
    getDrawer(state: IStateUi): boolean {
      return state.drawer;
    },
    getSnackbar(state: IStateUi): IUiSnackbar {
      return state.snackbar;
    },
  },
};
