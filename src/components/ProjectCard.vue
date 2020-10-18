<template>
  <v-card class="mx-auto" to="/">
    <v-img class="white--text align-end" height="200px" src="https://cdn.vuetifyjs.com/images/cards/docks.jpg">
      <v-card-title>The Project Title</v-card-title>
    </v-img>

    <v-card-subtitle class="pb-0"> Number 10 </v-card-subtitle>

    <v-card-text class="text--primary">
      <div>A small description...</div>
    </v-card-text>

    <v-card-actions>
      <v-btn @click="likeIt" @mousedown.stop @touchstart.stop color="red" text>
        <v-icon class="mr-1" v-if="like">mdi-heart</v-icon>
        <v-icon class="mr-1" v-else>mdi-heart-outline</v-icon>
        256
      </v-btn>

      <v-spacer></v-spacer>
      <v-chip>Released</v-chip>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component({})
export default class Home extends Vue {
  like = false;
  likeIt(): void {
    this.like = !this.like;
  }
}
</script>
