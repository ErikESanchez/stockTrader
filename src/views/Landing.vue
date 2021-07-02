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
import { mapGetters } from "vuex";
import { UserPictures } from "@/storeModules/userPublicData";
export default Vue.extend({
  name: "landing",
  components: {
    UserPortfolios,
  },
  watch: {
    profilePicturesURL(profilePictures: Array<UserPictures>) {
      this.userPortfolios.forEach((result: UserPortfolio, index: number) => {

        for (const [index, name] of profilePictures.entries()) {
          if (result.name === profilePictures[index].name) {
            console.log('Users with profile pictures', result.name);
            console.log(result)
          }
        }
        // console.log(profilePictures)
      });
    },
  },
  computed: {
    ...mapGetters("portfolio", ["userPortfolios"]),
    ...mapGetters("userPublicData", ["profilePicturesURL"]),
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
