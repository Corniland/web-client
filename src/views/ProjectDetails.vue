<template>
  <v-container>
    <v-row>
      <ProjectCard :project="project" />
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

import ProjectCard from "@/components/ProjectCard.vue";
import { Project } from "@/store/modules/projects";

@Component({
  components: {
    ProjectCard,
  },
})
export default class Home extends Vue {
  get project(): Project | undefined {
    console.log("sdfre");
    return this.$store.direct.state.projects.projects.find((p) => p.id === this.$router.currentRoute.params.id);
  }

  async beforeCreate(): Promise<void> {
    console.log("toss");
  }
}
</script>
