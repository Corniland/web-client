<template>
  <v-container fill-height>
    <v-layout align-center justify-center text-center>
      <v-flex xs12 sm10 md6 lg4 xl3>
        <h1>Log in</h1>

        <v-form v-model="valid" ref="form" lazy-validation class="pa-3 pt-4">
          <v-text-field
            label="Email"
            v-model="email"
            autocomplete="email"
            prepend-icon="mdi-email"
            required
            :rules="[
              (v) => !!v || 'Email is required',
              (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Email must be valid',
              (v) => !wrong || 'Email or password incorrect',
            ]"
            @input="wrong = false"
          />
          <v-text-field
            label="Password"
            v-model="password"
            autocomplete="current-password"
            :append-icon="hidePass ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="hidePass = !hidePass"
            :type="hidePass ? 'password' : 'text'"
            prepend-icon="mdi-lock"
            required
            :rules="[(v) => !!v || 'Password is required', (v) => !wrong || 'Email or password incorrect']"
            @input="wrong = false"
          />
        </v-form>

        <v-card-actions class="pa-3">
          <v-btn @click="submit" :disabled="!valid" :loading="loading" block depressed> Login </v-btn>
        </v-card-actions>
        <v-card-actions class="pa-3 justify-center">
          <v-btn to="/register" depressed text>Register</v-btn>
        </v-card-actions>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Watch } from "vue-property-decorator";

@Component({
  components: {},
})
export default class Login extends Vue {
  valid = false;
  hidePass = true;
  email = "";
  password = "";
  loading = false;
  wrong = false;

  $refs!: {
    form: HTMLFormElement;
  };

  @Watch("wrong")
  onWrongChange(): void {
    this.$refs.form.validate();
  }

  async submit(): Promise<void> {
    if (this.$refs.form.validate()) {
      this.loading = true;
      try {
        await this.$store.direct.dispatch.authentication.login({ email: this.email, password: this.password });
        this.$router.push("/");
      } catch (err) {
        console.error(err);
        this.wrong = true;
      } finally {
        this.loading = false;
      }
    }
  }
}
</script>
