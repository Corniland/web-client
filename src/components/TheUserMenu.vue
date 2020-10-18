<template>
  <v-card>
    <v-list v-if="isAuthenticated">
      <v-list-item>
        <v-list-item-avatar>
          <img :src="avatarUrl" :alt="username" />
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{ username }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-divider v-if="isAuthenticated"></v-divider>

    <v-list>
      <v-list-item to="/login" v-if="!isAuthenticated">
        <v-list-item-avatar height="100%">
          <v-icon>mdi-login</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>Login</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item to="/register" v-if="!isAuthenticated">
        <v-list-item-avatar height="100%">
          <v-icon>mdi-account-plus</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>Register</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item to="/profile" v-if="isAuthenticated">
        <v-list-item-avatar height="100%">
          <v-icon>mdi-account</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>Profile</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item to="/profile/edit" v-if="isAuthenticated">
        <v-list-item-avatar height="100%">
          <v-icon>mdi-cog</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>Settings</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item @click="logout" v-if="isAuthenticated">
        <v-list-item-avatar height="100%">
          <v-icon>mdi-logout</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item @click="toggleDarkTheme">
        <v-list-item-action>
          <v-switch v-model="$store.direct.getters.darkTheme" color="purple"></v-switch>
        </v-list-item-action>
        <v-list-item-title>Dark Theme</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<style lang="scss" scoped>
.v-list-item--active::before {
  opacity: 0 !important;
}
.theme--dark.v-list-item:hover::before {
  opacity: 0.08 !important;
}
</style>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import md5 from "md5";

@Component({})
export default class App extends Vue {
  get username(): string {
    return this.$store.direct.state.authentication.user?.username || "";
  }

  get avatarUrl(): string {
    const email = this.$store.direct.state.authentication.user?.email || "";
    return `https://www.gravatar.com/avatar/${md5(email)}?d=identicon?f=y`;
  }

  get isAuthenticated(): boolean {
    return this.$store.direct.getters.authentication.isAuthenticated;
  }

  async logout(): Promise<void> {
    await this.$store.direct.dispatch.authentication.logout();
    this.$router.push("/");
  }

  toggleDarkTheme(): void {
    this.$store.direct.commit.SET_DARKTHEME(!this.$store.direct.getters.darkTheme);
  }
}
</script>
