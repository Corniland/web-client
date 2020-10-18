import Vue from "vue";
import Vuetify from "vuetify/lib";

import Store from "@/store";

Vue.use(Vuetify);

const vuetify = new Vuetify({
  theme: {
    dark: Store.getters.darkTheme,
  },
});

export default vuetify;

Store.original.watch(
  (_state, getters) => getters.darkTheme,
  (val) => (vuetify.framework.theme.dark = val)
);
