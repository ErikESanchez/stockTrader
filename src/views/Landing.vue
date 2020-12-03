<template>
  <div class="container">
    <!-- Todo: Figure out a way to use a div instead -->
    <div class="row">
      <user-portfolios
        v-for="(portfolio, index) in userPortfolios"
        :key="index"
        class="col-5"
        style="margin: 5px"
        :userPortfolio="portfolio"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import UserPortfolios from "@/components/UserPortfolios.vue";
import store from "@/store";
import { UserPortfolio } from "@/storeModules/portfolio";
import { mapState } from "vuex";
export default Vue.extend({
  name: "landing",
  components: {
    UserPortfolios,
  },
  async mounted() {
    if (this.userPortfolios[0] === undefined) {
      console.log("bruh");
      await store.dispatch("portfolio/getAllUsers");
    }
  },
  computed: mapState("portfolio", ["userPortfolios"]),
});
</script>

<style scoped>
div {
  font-family: Poppins, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol";
}
</style>