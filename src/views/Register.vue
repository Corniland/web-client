<template>
  <v-container fill-height>
    <v-layout align-center justify-center text-center>
      <v-flex xs12 sm10 md6 lg4 xl3>
        <h1>Register</h1>

        <v-form v-model="valid" ref="form" class="pa-3 pt-4">
          <v-text-field
            label="Username"
            v-model="username"
            prepend-icon="mdi-account"
            required
            :rules="[(v) => !!v || 'Username is required']"
          />
          <v-text-field
            label="Email"
            v-model="email"
            autocomplete="email"
            prepend-icon="mdi-email"
            required
            :rules="[(v) => !!v || 'Email is required', (v) => emailRegex.test(v) || 'Email must be valid']"
          />
          <v-text-field
            label="Password"
            v-model="password"
            autocomplete="new-password"
            :append-icon="hidePass ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="hidePass = !hidePass"
            :type="hidePass ? 'password' : 'text'"
            prepend-icon="mdi-lock"
            required
            :rules="[(v) => !!v || 'Password is required']"
          />
          <v-text-field
            label="Password"
            v-model="passwordRepeat"
            autocomplete="new-password"
            :append-icon="hidePassRepeat ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="hidePassRepeat = !hidePassRepeat"
            :type="hidePassRepeat ? 'password' : 'text'"
            prepend-icon="mdi-lock"
            required
            :rules="[(v) => !!v || 'Password is required']"
          />
        </v-form>
        <v-card-actions class="pa-3">
          <v-btn @click="submit" :disabled="!valid" :loading="loading" block depressed>Register</v-btn>
        </v-card-actions>
        <v-card-actions class="pa-3 justify-center">
          <v-btn to="/login" depressed text>Login</v-btn>
        </v-card-actions>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component({
  components: {},
})
export default class Home extends Vue {
  email = "";
  username = "";
  password = "";
  passwordRepeat = "";

  hidePass = true;
  hidePassRepeat = true;

  valid = false;
  loading = false;

  // eslint-disable-next-line no-control-regex
  emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

  $refs!: {
    form: HTMLFormElement;
  };

  async submit(): Promise<void> {
    if (this.$refs.form.validate()) {
      this.loading = true;
      try {
        await this.$store.direct.dispatch.authentication.register({
          username: this.username,
          email: this.email,
          password: this.password,
        });
        this.$router.push("/");
      } catch (err) {
        console.error(err);
      } finally {
        this.loading = false;
      }
    }
  }
}
</script>
