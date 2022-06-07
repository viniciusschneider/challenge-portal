import configs from "@/store/configs";
import teams from "@/store/teams";
import ui from "@/store/ui";
import user from "@/store/user";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    configs,
    teams,
    ui,
    user,
  },
});
