<template>
  <div class="jumbotron jumbotron-fluid jmb">
    <div class="container">
      <h1 class="display-4">Trade Portfolio or View Portfolio</h1>
      <p class="lead">You may Save & Load your Data</p>
      <p class="lead">Click on: 'End Day' to begin a new day!</p>
      <hr />
      <h2 class="lead">
        <strong>Your Funds: ${{funds}}</strong>
      </h2>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import store from "@/store";
export default Vue.extend({
  data() {
    return {
      funds: 0
    };
  },
  created() {
    this.funds = store.getters.getTotalFunds;
  },
  methods: {}
});
</script>

<style>
.jmb {
  margin: 30px;
}
</style>

