<template>
  <div>
    <b-input-group prepend="Username" class="mt-3">
      <b-form-input v-model="userInput.username"></b-form-input>
      <b-input-group-append></b-input-group-append>
    </b-input-group>

    <b-input-group prepend="Password" class="mt-3" type="password">
      <b-form-input v-model="userInput.password"></b-form-input>
      <b-input-group-append></b-input-group-append>
    </b-input-group>

    <b-button variant="outline-success" @click="logIn()">Login</b-button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { firebaseData } from "../firebase";
import { User } from "../Classes/User";
export default Vue.extend({
  data() {
    return {
      userInput: {
        username: String(),
        password: String()
      }
    };
  },
  methods: {
    logIn() {
      let user = this.$store.getters.getUserClass;
      user.login(this.userInput.username, this.userInput.password);
    }
  }
});
</script>

<style>
</style>