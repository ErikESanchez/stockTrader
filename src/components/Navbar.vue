<template>
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand href="#">
      <router-link to="/" class="navbar-brand">Stock Trader</router-link>
    </b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <button
      @click="func()"
      type="button"
      class="btn btn-light dropdown-toggle"
      data-toggle="dropdown"
      aria-haspopup="true"
      aria-expanded="false"
    >Update User Funds</button>
    <a>Funds: {{ funds }}</a>

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
  <!-- <nav class="navbar navbar-expand-lg navbar-light bg-light nv">
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
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/stocks" class="nav-link">Stocks</router-link>
          <span class="sr-only">(current)</span>
        </li>
        <li class="nav-item">
          <router-link to="/portfolio" class="nav-link">Portfolio</router-link>
        </li>
      </ul>
      <button type="button" class="btn btn-light">End Day</button>
      
      <button type="button" class="btn btn-light">Save Load</button>
    </div>
  </nav>-->
</template>

<script lang="ts">
import Vue from "vue";
import { TradeStocks } from "../Classes/TradeStocks";

export default Vue.extend({
  data() {
    return {
      funds: Array<userPriceHistory>()
    };
  },
  created() {
    let tradeStock: TradeStocks = new TradeStocks();
    tradeStock.updateUserFunds;
    this.$store.commit("updateUserFunds");
    this.funds = tradeStock.getLatestUserFunds;
    console.log(this.funds);
    // ? How to make the navbar show the most recent form of funds, the code is here, just need to find somewhere to put it
  },
  methods: {
    newPrices() {
      this.BMW_Stock = this.$store.commit(
        "generateStockPrices",
        this.BMW_Stock
      );
    },
    func() {
      let tradeStock: TradeStocks = new TradeStocks();

      this.funds = this.tradeStock.getLatestUserFunds;
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