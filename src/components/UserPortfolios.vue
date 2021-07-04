<template>
  <div class="card text-white" style="width: 500; background-color: #232627">
    <div class="card-body" style="font: 16px Nunito, sans-serif">
      <h5 class="card-title text-center">{{ userPortfolio.name }}</h5>
      <h6 class="card-subtitle mb-2 text-white">
        <div style="overflow-x: auto; white-space: nowrap">
          Portfolio Worth:
          <div class="text-success" style="display: inline-block">
            {{ userPortfolio.portfolioWorth }}$
          </div>
        </div>
        Funds:
        <div class="text-success" style="display: inline-block">
          {{ userPortfolio.availableFunds }} $
        </div>
      </h6>
      <img
        :src="userPortfolio.photoURL"
        height="30"
        width="30"
        v-if="userPortfolio.photoURL != ''"
      />
      <pie-chart :portfolioChart="userPortfolio.ownedStocks" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import UserPortfolioPie from "@/components/UserPortfolioPie.vue";
export default Vue.extend({
  props: ["userPortfolio"],
  components: {
    pieChart: UserPortfolioPie,
  },
});
</script>

<style></style>
