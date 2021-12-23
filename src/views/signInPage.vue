<template>
  <div class="container col-sm-4">
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
    <!-- Button trigger modal -->
    <button
      type="button"
      class="btn btn-primary"
      data-bs-toggle="modal"
      data-bs-target="#exampleModal"
      @click="login()"
    >
      Sign In
    </button>
    <!-- Modal -->
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5
              class="modal-title"
              id="exampleModalLabel"
              v-if="errorMessage == ''"
            >
              Success, taking you to the money!
            </h5>
            <h5 class="modal-title" id="exampleModalLabel" v-else>
              Sign Up Error!
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body" v-if="errorMessage != ''">
            {{ errorMessage }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import store from "@/store";
import { UserInput } from "../storeModules/userModule";
import { mapGetters } from "vuex";

export default Vue.extend({
  name: "signin",
  data() {
    return {
      userInput: {
        username: String(),
        password: String(),
      },
      errorMessage: String(),
    };
  },
  methods: {
    async login() {
      await store
        .dispatch("userModule/signIn", this.userInput)
        .then(() => {
          let modalBackdrop = document.getElementsByClassName(
            "modal-backdrop"
          )[0];
          modalBackdrop.remove();
        })
        .catch((error) => {
          this.errorMessage = error;
        });
    },
  },
});
</script>

<style>
.modal-content {
  background: #181a1b !important;
}
</style>
