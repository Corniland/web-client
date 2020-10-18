<template>
  <v-container>
    <v-row>
      <v-col v-for="n in 24" :key="n" cols="12" sm="6" lg="3" xl="2">
        <ProjectCard />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

import ProjectCard from "@/components/ProjectCard.vue";

@Component({
  components: {
    ProjectCard,
  },
})
export default class Home extends Vue {}
</script>
