import Vue from "vue";
import Vuex from "vuex";
import { createDirectStore } from "direct-vuex";

import authentication from "./modules/authentication";
import snackbar from "./modules/snackbar";
import projects from "./modules/projects";

Vue.use(Vuex);

export interface RootState {
  darkTheme: boolean | undefined;
}

const { store, rootActionContext, moduleActionContext, rootGetterContext, moduleGetterContext } = createDirectStore({
  modules: {
    authentication,
    snackbar,
    projects,
  },
  state: {
    darkTheme: undefined,
  } as RootState,
  getters: {
    darkTheme: (state): boolean => state.darkTheme || localStorage.getItem("darkTheme") === "true",
  },
  mutations: {
    SET_DARKTHEME(state, darkTheme: boolean) {
      state.darkTheme = darkTheme;
      localStorage.setItem("darkTheme", darkTheme.toString());
    },
  },
});

// Export the direct-store instead of the classic Vuex store.
export default store;

// The following exports will be used to enable types in the
// implementation of actions and getters.
export { rootActionContext, moduleActionContext, rootGetterContext, moduleGetterContext };

// The following lines enable types in the injected store '$store'.
export type AppStore = typeof store;
declare module "vuex" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Store<S> {
    direct: AppStore;
  }
}
