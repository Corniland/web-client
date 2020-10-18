import { defineModule } from "direct-vuex";

import { moduleActionContext } from "@/store/";
import axios from "@/axios";

export interface Project {
  id: string;
  title: string;
  short_description: string;
  description: string;
  cover_picture_url: string;
  status: string;
  published: false;
  owner: string;
  members: string[];
  likes: number;
}

export interface ProjectsState {
  projects: Project[];
}

const module = defineModule({
  namespaced: true as const,
  state: {
    projects: [],
  } as ProjectsState,
  getters: {},
  mutations: {
    SET_PROJECTS(state: ProjectsState, projects: Project[]) {
      state.projects = projects;
    },
  },
  actions: {
    async getProjects(context) {
      const { commit } = moduleActionContext(context, module);
      const response = await axios.get<Project[]>(`/api/projects`);

      commit.SET_PROJECTS(response.data);
    },
    async like(context, project: Project) {
      const { commit } = moduleActionContext(context, module);
      const response = await axios.post(`/api/projects/${project.id}/like`);

      commit.SET_PROJECTS(response.data);
    },
    async init(context) {
      const { dispatch } = moduleActionContext(context, module);
      await dispatch.getProjects();
    },
  },
});

export default module;
