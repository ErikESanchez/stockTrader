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
      if (this.userInput.username != "" && this.userInput.password != "") {
        // TODO:  Make an if stament to verfify no duplicate users by checking the database
        firebaseData
          .auth()
          .createUserWithEmailAndPassword(
            this.userInput.username,
            this.userInput.password
          )
          .catch(function(error) {
            let errorCode = error.code;
            let errorMessage = error.message;
            console.log(errorCode, errorMessage);
          });
      } else {
        console.log("Please type in a valid username and password");
      }
    }
  }
});
</script>

<style>
</style>