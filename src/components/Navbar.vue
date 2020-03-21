<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light nv">
    <router-link to="/" class="navbar-brand">Stock Trader</router-link>
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
      <button
        type="button"
        class="btn btn-light dropdown-toggle"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >Save & Load</button>
      <button type="button" class="btn btn-light">Save Load</button>
      <a>Funds: {{ funds }}</a>
    </div>
  </nav>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      funds: null
    };
  },
  created() {
    this.funds = this.$store.getters.getTotalFunds;
  },
  methods: {
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