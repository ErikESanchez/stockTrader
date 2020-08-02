<template>
  <div class="card bg-dark text-white border-light" style="width: 500px;">
    <div class="card-body" style="font: 21px Nunito, sans-serif">
      <h5 class="card-title text-center">{{ user.name }}</h5>
      <h6
        class="card-subtitle mb-2 text-white"
        style="font: 21px Nunito, sans-serif"
      >
        <div style="overflow-x: auto; white-space: nowrap;">
          Portfolio Worth:
          <div class="text-success" style="display: inline-block">
            {{ user.portfolioWorth }}$
          </div>
        </div>
        Funds:
        <div class="text-success" style="display: inline-block">
          {{ user.availableFunds }}$
        </div>
      </h6>
      <h6 class="card-subtitle mb-2 text-white"></h6>
      <p class="card-text" v-for="stock in user.ownedStocks" :key="stock.id">
        {{ stock.symbol }} Stock: {{ stock.amountOwned }}
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
