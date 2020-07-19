<template>
  <div>
    <user-portfolios
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
export default Vue.extend({
  name: "landing",
  components: {
    UserPortfolios,
  },
  data() {
    return {
      userData: {},
    };
  },
  async mounted() {
    await store.dispatch("portfolio/getAllUsers").then((res) => {
      console.log("res", res);
      this.userData = res;
    });
  },
});
</script>
