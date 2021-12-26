<template>
  <div class="container px-2">
    <div class="row justify-content-lg-center gx-2" v-if="user.email">
      <user-portfolios
        v-for="(individualPortfolio, index) in userPortfolios"
        :key="index"
        class="col-lg-auto p-2"
        :individualPortfolio="individualPortfolio"
      />
    </div>
    <div v-else>
      <img src="../assets/welcome.jpeg" class="img-fluid" alt="..." />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import UserPortfolios from "@/components/UserPortfolios.vue";
import { mapGetters } from "vuex";
export default Vue.extend({
  name: "landing",
  components: {
    UserPortfolios,
  },
  computed: {
    ...mapGetters("userModule", ["user"]),
    ...mapGetters("portfolio", ["userPortfolios"]),
  },
});
</script>

<style scoped>
div {
  font-family: Poppins, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol";
}
</style>
