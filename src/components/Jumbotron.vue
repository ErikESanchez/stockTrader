<template>
  <div class="jumbotron jumbotron-fluid jmb">
    <div class="container">
      <h1 class="display-4">
        <router-link to="/stocks" class="link">Trade Stocks</router-link> or
        <router-link to="/portfolio" class="link">View Portfolio</router-link>
      </h1>
      <p class="lead">You may Save & Load your Data</p>
      <p class="lead">Click on: 'End Day' to begin a new day!</p>
      <hr />
      <h2 class="lead">
        <strong>Your Funds: ${{avaibleUserFunds}}</strong>
      </h2>
    </div>
  </div>
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
.jmb {
  margin: 30px;
}
</style>

