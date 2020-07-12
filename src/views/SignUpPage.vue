<template>
  <div>
    <div>
      <div class="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input
          type="email"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          v-model.trim="userInput.username"
        />
        <small id="emailHelp" class="form-text text-muted"
          >We'll never share your email with anyone else.</small
        >
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input
          type="password"
          class="form-control"
          id="exampleInputPassword1"
          v-model.trim="userInput.password"
        />
      </div>
      <button class="btn btn-primary" @click="createNewUser()">
        Sign Up
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { firebaseData } from "../firebase";
import store from "@/store";
export default Vue.extend({
  data() {
    return {
      userInput: {
        username: String(),
        password: String(),
      },
    };
  },
  methods: {
    createNewUser() {
      store.dispatch("userModule/createNewUser", this.userInput);
    },
  },
});
</script>

<style></style>
