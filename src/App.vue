<template>
  <div id="app">
    <navbar></navbar>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

// Todo: add a footer if you want
import Navbar from "./components/Navbar.vue";
import { User } from "@/Classes/User";
import { Portfolio } from "@/Classes/Portfolio";
import { firebaseData } from "@/firebase";
import store from "@/store";

export default Vue.extend({
  name: "App",
  components: {
    Navbar
  },
  data() {
    return {
      signedIn: false,
      dataLoaded: false
    };
  },
  async created() {
    await firebaseData.auth().onAuthStateChanged(async user => {
      if (user) {
        this.signedIn = true;
        store.commit("changedSignedInStatus", true);
        store.commit("updateAccountInfo", user);
        console.log(store.getters.getMyAccont);
        // Todo: Get user Portfolio Data
        // If user does not have account make one, but prompt the user for one first
        console.log(user);
        this.dataLoaded = true;
        await store
          .dispatch("getMyPortfolioData")
          .then(myData => {
            // let formatedPortfolioData: newPortfolioData = portfolioConverter.fromFbPortfolioData(
            //   myData.id,
            //   myData.data()
            // );
            // Todo: have the transacion history data empty
            // let myPortfolioData: Portfolio = new Portfolio(
            //   formatedPortfolioData.id,
            //   formatedPortfolioData.name,
            //   formatedPortfolioData.avaibleFunds,
            //   [],
            //   formatedPortfolioData.portfolioWorth
            // );
            // store.commit("addMyPortfolio", myPortfolioData);
            // store.commit("addPortfolio", myPortfolioData);
            this.dataLoaded = true;
          })
          .catch(err => {
            store.commit("changedSignedInStatus", false);
            this.dataLoaded = false;
            console.error(err);
          });
      } else {
        // Todo: get rid of data from portfolio
        store.commit("changedSignedInStatus", false);
        console.log("$$$ Sign Up to get some dolla dolla bills yall $$$");
        this.dataLoaded = true;
      }
    });
    store.commit("setUserClass", new User());
    let user = store.getters.getUserClass;
    await user.fetchUser();
  }
});
</script>

 <style lang="scss">
@import "~bootstrap/scss/bootstrap";
</style>

