<template>
  <v-app-bar app color="primary" dark>
    <div class="d-flex align-center">
      <v-img
        alt="Vuetify Logo"
        class="shrink mr-2"
        contain
        src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
        transition="scale-transition"
        width="40"
      />

      <v-img
        alt="Vuetify Name"
        class="shrink mt-1 hidden-sm-and-down"
        contain
        min-width="100"
        src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
        width="100"
      />
    </div>

    <v-spacer></v-spacer>

    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on" @click="toggleDarkTheme">
          <v-icon v-if="$vuetify.theme.dark">mdi-white-balance-sunny</v-icon>
          <v-icon v-else>mdi-weather-night</v-icon>
        </v-btn>
      </template>
      <span v-if="$vuetify.theme.dark">Light Theme</span>
      <span v-else>Dark Theme</span>
    </v-tooltip>

    <v-menu offset-y :close-on-content-click="false">
      <template v-slot:activator="{ on, attrs }">
        <v-btn fab text v-bind="attrs" v-on="on">
          <v-avatar>
            <v-icon large v-if="$store.direct.getters.authentication.isAuthenticated">mdi-account-circle</v-icon>
            <v-icon large v-else>mdi-account-question</v-icon>
          </v-avatar>
        </v-btn>
      </template>

      <TheUserMenu />
    </v-menu>
  </v-app-bar>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

import TheUserMenu from "@/components/TheUserMenu.vue";

@Component({
  components: {
    TheUserMenu,
  },
})
export default class App extends Vue {
  toggleDarkTheme(): void {
    this.$store.direct.commit.SET_DARKTHEME(!this.$store.direct.getters.darkTheme);
  }
}
</script>
