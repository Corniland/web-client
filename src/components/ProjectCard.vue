<template>
  <v-card class="mx-auto" @click="go">
    <v-img class="white--text align-end" height="200px" :src="project.cover_picture_url">
      <v-card-title>{{ project.title }}</v-card-title>
    </v-img>

    <!-- <v-card-subtitle class="pb-0"> Number 10 </v-card-subtitle> -->

    <v-card-text class="text--primary">
      <div>{{ project.short_description }}</div>
    </v-card-text>

    <v-card-actions>
      <v-btn @click.stop="likeIt" @mousedown.stop @touchstart.stop color="red" text>
        <v-icon class="mr-1" v-if="like">mdi-heart</v-icon>
        <v-icon class="mr-1" v-else>mdi-heart-outline</v-icon>
        {{ project.likes + (like ? 1 : 0) }}
      </v-btn>

      <v-spacer></v-spacer>
      <v-chip>{{ project.status }}</v-chip>
    </v-card-actions>
  </v-card>
</template>

<style lang="scss" scoped>
::v-deep .v-card__title {
  text-shadow: 1px 1px 3px black;
}
</style>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

import { Project } from "@/store/modules/projects";

@Component({})
export default class Home extends Vue {
  @Prop({ required: true })
  project!: Project;

  like = false;
  likeIt(): void {
    this.$store.direct.dispatch.projects.like(this.project);
  }

  go(): void {
    this.$router.push(`/project/${this.project.id}`);
  }
}
</script>
