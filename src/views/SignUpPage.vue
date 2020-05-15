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

    <b-button variant="outline-success" @click="createNewUser()">Sign Up</b-button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { firebaseData } from "../firebase";
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
    createNewUser() {
      let user = this.$store.getters.getUserClass;
      user.createNewUser(this.userInput);
    }
  }
});
</script>

<style>
</style>