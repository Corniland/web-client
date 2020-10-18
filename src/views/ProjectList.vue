<template>
  <v-container>
    <v-row justify="space-around">
      <v-col v-for="project in projects" :key="project.id" cols="12" sm="6" lg="4" xl="3">
        <ProjectCard :project="project" />
      </v-col>
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
  get projects(): Project[] {
    return this.$store.direct.state.projects.projects;
  }
}
</script>
