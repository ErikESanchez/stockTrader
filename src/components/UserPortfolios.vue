<template>
  <div class="card bg-dark text-white border-light" style="width: 18rem;">
    <div class="card-body">
      <h5 class="card-title">{{ user.name }}</h5>
      <h6 class="card-subtitle mb-2 text-white">
        Portfolio Worth:
        <div class="text-success">{{ user.portfolioWorth }}</div>
      </h6>
      <p class="card-text" v-for="stock in user.ownedStocks" :key="stock.id">
        {{ stock.symbol }}
        Amount Owned: {{ stock.amountOwned }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: ["user"],
});
</script>

<style></style>
