<template>
  <div>
    <div>
      <user-portfolios
        v-for="(portfolio, index) in userPortfolios"
        :key="index"
        class="container"
        style="margin-top: 10px;"
        :portfolio="portfolio"
      />
      <!-- <pie-chart :portfolio="portfolio" /> -->
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import UserPortfolios from "@/components/UserPortfolios.vue";
import store from "@/store";
import UserPortfolioPie from "@/components/UserPortfolioPie.vue";
import { UserPortfolio } from "@/storeModules/portfolio";
export default Vue.extend({
  name: "landing",
  components: {
    UserPortfolios,
    // pieChart: UserPortfolioPie,
  },
  props: ["portfolio"],
  data() {
    return {
      userPortfolios: Object() as Array<UserPortfolio>,
    };
  },
  async mounted() {
    await store
      .dispatch("portfolio/getAllUsers")
      .then((userPortfolios: Array<UserPortfolio>) => {
        this.userPortfolios = userPortfolios;
      });
  },
});
</script>
