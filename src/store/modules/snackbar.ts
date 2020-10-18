import { defineModule } from "direct-vuex";

import { moduleActionContext } from "@/store/";

export interface SnackbarState {
  display: boolean;
  text: string;
}

const module = defineModule({
  namespaced: true as const,
  state: {
    display: false,
    text: "",
  } as SnackbarState,
  getters: {},
  mutations: {
    SET_TEXT(state: SnackbarState, text: string) {
      state.text = text;
    },
    SET_DISPLAY(state: SnackbarState, display: boolean) {
      state.display = display;
    },
  },
  actions: {
    async show(context, text) {
      const { commit } = moduleActionContext(context, module);
      commit.SET_DISPLAY(true);
      commit.SET_TEXT(text);
    },
  },
});

export default module;
