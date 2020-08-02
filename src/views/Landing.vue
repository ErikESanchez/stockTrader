<template>
  <div>
    <user-portfolios
      class="container"
      style="margin-top: 10px;"
      v-for="(user, index) in userData"
      :user="user"
      :key="index"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import UserPortfolios from "@/components/UserPortfolios.vue";
import store from "@/store";
import { UserPortfolio } from "@/storeModules/portfolio";
export default Vue.extend({
  name: "landing",
  components: {
    UserPortfolios,
  },
  data() {
    return {
      userData: Object() as Array<UserPortfolio>,
    };
  },
  async mounted() {
    await store
      .dispatch("portfolio/getAllUsers")
      .then((userPortfolios: Array<UserPortfolio>) => {
        this.userData = userPortfolios;
      });
  },
});
</script>
