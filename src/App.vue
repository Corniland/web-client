<template>
  <v-app>
    <TheAppBar />

    <v-main>
      <router-view></router-view>
    </v-main>
    <v-snackbar v-model="$store.direct.state.snackbar.display">
      {{ $store.direct.state.snackbar.text }}

      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="() => $store.direct.commit.snackbar.SET_DISPLAY(false)">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

import TheAppBar from "@/components/TheAppBar.vue";

@Component({
  name: "App",
  components: {
    TheAppBar,
  },
})
export default class App extends Vue {
  async created(): Promise<void> {
    await this.$store.direct.dispatch.authentication.whoami();
  }
}
</script>
