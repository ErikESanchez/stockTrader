<template>
  <div class="container col-sm-4">
    <div class="form-group">
      <label for="exampleInputEmail1">Email address</label>
      <input
        type="email"
        class="form-control"
        id="exampleInputEmail1"
        aria-describedby="emailHelp"
        v-model.trim="username"
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
        v-model.trim="password"
      />
    </div>
    <button class="btn btn-primary" @click="login(username, password)">
      Submit
    </button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { firebaseData } from "../firebase";
import store from "@/store";
import { UserInput } from "../storeModules/userModule";
import { mapGetters } from "vuex";

export default Vue.extend({
  name: 'signin',
  data() {
    return {
      username: String(),
      password: String(),
    };
  },
  computed: {
    ...mapGetters("userModule", ["user"]),
  },
  watch: {
    user(event) {
      this.$router.push('/')
    },
  },
  methods: {
    login(username: string, password: string) {
      let userInput: UserInput = {
        username: username,
        password: password,
      };
      console.log("userINput", userInput);
      store.dispatch("userModule/signIn", userInput);
    },
  },
});
</script>

<style></style>
