<template>
  <div>
    <b-input-group prepend="Username" class="mt-3">
      <b-form-input v-model.trim="userInput.username"></b-form-input>
      <b-input-group-append></b-input-group-append>
    </b-input-group>

    <b-input-group prepend="Password" class="mt-3" type="password">
      <b-form-input v-model.trim="userInput.password"></b-form-input>
      <b-input-group-append></b-input-group-append>
    </b-input-group>

    <b-button variant="outline-success" @click="login(userInput.username, userInput.password)">Login</b-button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { firebaseData } from "../firebase";
import { Account } from "@/Classes/Account";
import store from "@/store";
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
    login(username: string, password: string) {
      let userInput: Object = {
        username: username,
        password: password
      };
      store.dispatch("login", userInput);
    }
  }
});
</script>

<style>
</style>