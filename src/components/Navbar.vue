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
  <nav v-else>Sign In | Sign Up</nav>
</template>

<script lang="ts">
import Vue from "vue";
import store from "@/store";
import { portfolioStoreSchema } from "../storeModules/portfolioStore";
import { accountStoreSchema } from "../storeModules/accountStore";

export default Vue.extend({
  data() {
    return {
      signedIn: Boolean
    };
  },
  created() {
    this.signedIn = store.getters[accountStoreSchema.getters.getSignedInStatus];
  },
  computed: {
    avaibleUserFunds: function() {
      return store.getters[portfolioStoreSchema.getters.getAvaibleFunds];
    }
  }
});
</script>

