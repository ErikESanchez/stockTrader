<template>
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand href="#">
      <router-link to="/" class="navbar-brand">Stock Trader</router-link>
    </b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <!-- <button
      @click="func()"
      type="button"
      class="btn btn-light dropdown-toggle"
      data-toggle="dropdown"
      aria-haspopup="true"
      aria-expanded="false"
    >Update User Funds</button>-->
    <!-- <a>Funds: {{ funds }}</a> -->

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <router-link to="/stocks" class="nav-link">Stocks</router-link>
      </b-navbar-nav>
      <b-navbar-nav>
        <router-link to="/portfolio" class="nav-link">Portfolio</router-link>
      </b-navbar-nav>

      <b-navbar-nav class="ml-auto">
        <!-- <b-nav-form>
          <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
          <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
        </b-nav-form>-->
        <b-nav-item>Funds: ${{avaibleUserFunds}}</b-nav-item>
        <b-nav-item-dropdown right>
          <template v-slot:button-content>
            <em>User</em>
          </template>
          <b-dropdown-item href="#">Profile</b-dropdown-item>
          <b-dropdown-item href="#">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-button size="sm" class="my-2 my-sm-0" type="submit">End day</b-button>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script lang="ts">
import Vue from "vue";
import store from "@/store";
import { portfolioStoreSchema } from "../storeModules/portfolioStore";

export default Vue.extend({
  data() {
    return {};
  },
  computed: {
    avaibleUserFunds: function() {
      return store.getters[portfolioStoreSchema.getters.getAvaibleFunds];
    }
  }
});
</script>

<style>
.nv {
  position: relative;
  top: -30px;
  margin: 30px;
}
</style>