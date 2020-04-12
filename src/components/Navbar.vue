<template>
  <b-navbar toggleable="lg" type="dark" variant="info">
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
        <!-- <b-nav-form>
          <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
          <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
        </b-nav-form>-->
        <b-nav-item :key="latestUserFunds.funds">Funds: {{ latestUserFunds.funds }}</b-nav-item>
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
import { userPriceHistory } from "../store";
import { eventBus } from "../main";

export default Vue.extend({
  data() {
    return {
      latestUserFunds: Array<userPriceHistory>()
    };
  },
  created() {
    this.$store.commit("updateUserFunds");
    this.fundsUpdate();
    eventBus.$on("fireMethod", () => {
      this.fundsUpdate();
    });
    // ? How to make the navbar show the most recent form of funds, the code is here, just need to find somewhere to put it
  },
  methods: {
    fundsUpdate() {
      this.latestUserFunds = this.$store.getters.getUserFunds.slice(-1)[0];
    },
    newPrices() {
      this.BMW_Stock = this.$store.commit(
        "generateStockPrices",
        this.BMW_Stock
      );
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