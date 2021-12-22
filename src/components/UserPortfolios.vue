<template>
  <div
    class="card text-white"
    style=" background-color: #232627; margin-bottom: 5px"
  >
    <div class="card-body" style="font: 16px Nunito, sans-serif">
      <h5 class="card-title text-center col">{{ userPortfolio.name }}</h5>
      <img
        class="float-end img-responsive col"
        :src="userPortfolio.photoURL"
        v-if="userPortfolio.photoURL != ''"
      />
      <h6 class="card-subtitle text-center mb-2 text-white col">
        <!-- <div style="overflow-x: auto; white-space: nowrap" class="col">
          Portfolio Worth:
          <div class="text-success" style="display: inline-block">
            {{ userPortfolio.portfolioWorth }}$
          </div> -->
        <!-- </div> -->
        Funds:
        <div class="text-success col" style="display: inline-block">
          {{ userPortfolio.availableFunds }} $
        </div>
      </h6>

      <div
        class="col"
        v-if="Object.entries(userPortfolio.ownedStocks).length !== 0"
      >
        <pie-chart :portfolioChart="userPortfolio.ownedStocks" />
      </div>
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

<style scoped>
img {
  width: 50px;
  height: 50px;
  object-fit: cover;
}
</style>
