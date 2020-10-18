import { defineModule } from "direct-vuex";

import { moduleActionContext, moduleGetterContext } from "@/store/";
import router from "@/router";
import axios from "@/axios";

export interface User {
  id: string;
  username: string;
  email: string;
  private_profile: boolean;
  liked_projects: string[];
}

export interface AuthenticationState {
  user: User | null;
  jwt: string | undefined;
}

const TOKEN_KEY = "token";

const module = defineModule({
  namespaced: true as const,
  state: {
    user: null,
    urlToken: undefined,
    jwt: undefined,
  } as AuthenticationState,
  getters: {
    isAuthenticated: (state): boolean => !!state.user,
    jwt: (state): string | undefined => state.jwt || localStorage.getItem(TOKEN_KEY) || undefined,
  },
  mutations: {
    SET_JWT(state: AuthenticationState, jwt: string) {
      state.jwt = jwt;
      localStorage.setItem(TOKEN_KEY, jwt);
    },
    DELETE_JWT(state: AuthenticationState) {
      state.jwt = undefined;
      localStorage.removeItem(TOKEN_KEY);
    },
    SET_USER(state: AuthenticationState, user: User | null) {
      state.user = user;
    },
  },
  actions: {
    async login(context, { email, password }: { email: string; password: string }) {
      const { commit, dispatch, rootDispatch } = moduleActionContext(context, module);

      const response = await axios.post<{ jwt?: string }>(
        `/auth/user/login`,
        {
          email,
          password,
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      if (!response.data.jwt) throw new Error("Didn't get a JWT");
      commit.SET_JWT(response.data.jwt);
      await dispatch.whoami();
      // await rootDispatch.games.init();
    },
    async register(context, { email, login, password }: { email: string; login: string; password: string }) {
      const { dispatch, rootDispatch } = moduleActionContext(context, module);

      const response = await axios.post(
        `/auth/user/register`,
        {
          email,
          login,
          password,
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      await dispatch.whoami();
      // await rootDispatch.games.init();
    },
    logout(context) {
      const { commit, state } = moduleActionContext(context, module);
      commit.SET_USER(null);
      commit.DELETE_JWT();
      const query = Object.assign({}, router.currentRoute.query);
      delete query.token;
      router.push({ path: "/login", query });
    },
    async whoami(context) {
      const { commit, state, getters, rootCommit } = moduleActionContext(context, module);

      if (!getters.jwt) return;
      try {
        const response = await axios.get<{
          id: string;
          username: string;
          email: string;
          private_profile: boolean;
          liked_projects: string[];
        }>(`/auth/user/me`);
        commit.SET_USER({
          id: response.data.id,
          username: response.data.username,
          email: response.data.email,
          private_profile: response.data.private_profile,
          liked_projects: response.data.liked_projects,
        });
        // rootCommit.games.SET_FAVORITE_GAMES(response.data.favoriteGames);
        // rootCommit.games.SET_RECENT_GAMES(response.data.lastPlayedGames);
      } catch (e) {
        if (e.response.status === 403) {
          commit.SET_USER(null);
          localStorage.removeItem(TOKEN_KEY);
        }
      }
    },
  },
});

export default module;
