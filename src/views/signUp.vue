<template>
  <div>
    <form class="container" @submit.prevent="makeNewAccount">
      <div class="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input
          type="email"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          v-model.trim="email"
        />
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
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import store from "@/store";
import { newAccountCredentials } from "../storeModules/accountStore";

export default Vue.extend({
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    async makeNewAccount() {
      let payload: newAccountCredentials = {
        email: this.email,
        password: this.password
      };
      if (this.password.length > 5)
        await store.dispatch("createAccount", payload);
      else alert("BIGGER PASSWORD DUMBASS");
    }
  },
  name: "signUpPage"
});
</script>
