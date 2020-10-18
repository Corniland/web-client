<template>
  <v-container fill-height>
    <v-layout align-center justify-center text-center>
      <v-flex xs12 sm10 md6 lg4 xl3>
        <h1>Register</h1>

        <v-form v-model="valid" ref="form" lazy-validation class="pa-3 pt-4">
          <v-text-field label="Username" v-model="email" prepend-icon="mdi-account" required />
          <v-text-field label="Email" v-model="email" prepend-icon="mdi-email" required />
          <v-text-field
            label="Password"
            v-model="password"
            :append-icon="hidePass ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="hidePass = !hidePass"
            :type="hidePass ? 'password' : 'text'"
            prepend-icon="mdi-lock"
            required
          />
          <v-text-field
            label="Password Repeat"
            v-model="password"
            :append-icon="hidePass ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="hidePass = !hidePass"
            :type="hidePass ? 'password' : 'text'"
            prepend-icon="mdi-lock"
            required
          />
        </v-form>
        <v-card-actions class="pa-3">
          <v-btn @click="submit" :disabled="!valid" :loading="loadingBtn" block depressed>Register</v-btn>
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
  valid = false;
  hidePass = true;

  submit(): void {
    console.log("to");
  }
}
</script>
