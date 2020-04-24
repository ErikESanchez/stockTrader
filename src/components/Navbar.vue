<template>
  <!-- cash, messages, account -->
  <b-navbar toggleable="lg" type="dark" variant="info" v-if="signedIn">
    <b-navbar-brand href="#">
      <router-link to="/" class="navbar-brand">Stock Trader</router-link>
    </b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <router-link to="/stocks" class="nav-link">Stocks</router-link>
      </b-navbar-nav>
      <b-navbar-nav>
        <router-link to="/portfolio" class="nav-link">Portfolio</router-link>
      </b-navbar-nav>

      <b-navbar-nav class="ml-auto">
        <b-nav-item>Funds: ${{avaibleUserFunds}}</b-nav-item>
        <b-nav-item-dropdown right>
          <template v-slot:button-content>
            <em>User</em>
          </template>
          <b-dropdown-item href="#">Profile</b-dropdown-item>
          <b-dropdown-item href="#">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
  <!-- Todo: add router links to sign in and sign up -->
  <nav v-else>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <a class="navbar-brand" href="#">Dolla Dolla Bills</a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto"></ul>
        <button
          @click="logInRoute"
          class="btn btn-outline-success my-2 my-sm-0 mx-2"
          type="submit"
        >Log In</button>
        <button
          @click="signUpRoute"
          class="btn btn-outline-success my-2 my-sm-0 mx-2"
          type="submit"
        >Sign Up</button>
      </div>
    </nav>
  </nav>
</template>

<script lang="ts">
import Vue from "vue";
import store from "@/store";
import { portfolioStoreSchema } from "@/storeModules/portfolioStore";
import { accountStoreSchema } from "@/storeModules/accountStore";
import router from "@/router";

export default Vue.extend({
  data() {
    return {
    };
  },
  created() {
  },
  methods: {
    logInRoute() {
      router.push("/login");
    },
    signUpRoute() {
      router.push("/signUp");
    }
  },
  computed: {
    signedIn: function() {
      return store.getters[accountStoreSchema.getters.getSignedInStatus]
    },
    avaibleUserFunds: function() {
      return store.getters[portfolioStoreSchema.getters.getAvaibleFunds];
    }
  }
});
</script>

