<template>
  <div>
    <div v-if="signedIn">
      <div
        v-if="havePortfolioData"
      >Will show landing page with all portfolio data here {{myPortfolio}}</div>
      <div v-else class="container">
        <div>We need to steal some more of your info, give it to us and you can start making DOLLA DOLLA BILLS.</div>
        <form class="container" @submit.prevent="makeNewPortfolio">
          <div class="form-group">
            <label for="exampleInputEmail1">Name</label>
            <input
              type="text"
              class="form-control"
              id="name"
              aria-describedby="emailHelp"
              v-model.trim="name"
            />
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Social Security</label>
            <input type="text" class="form-control" id="SS" />
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Bank Account</label>
            <input type="text" class="form-control" id="BankAccount" />
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Initial Amount To Invest</label>
            <input
              type="number"
              class="form-control"
              id="initialAmountInvest"
              v-model="initialAmount"
            />
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
    <div v-else>Make An actual landing page</div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import router from "@/router";
import PortfolioStockCard from "@/components/PortfolioStockCard.vue";

// store
import store from "@/store";
import { accountStoreSchema } from "@/storeModules/accountStore";
import {
  portfolioStoreSchema,
  newPortfolioData,
  portfolioConverter
} from "@/storeModules/portfolioStore";

// Classes
import { Stock } from "@/Classes/Stock";
import { Portfolio, userStock } from "@/Classes/Portfolio";

export default Vue.extend({
  name: "landing",
  data() {
    return {
      name: "",
      initialAmount: 0
    };
  },
  methods: {
    // this will only be used once if needed
    async makeNewPortfolio() {
      let newPortData: newPortfolioData = {
        id: store.getters[accountStoreSchema.getters.getMyAccont].uid,
        name: this.name,
        ownedStocks: [],
        portfolioWorth: 0,
        avaibleFunds: Number(this.initialAmount)
      };
      if (Number(this.initialAmount) < 20000) {
        await store
          .dispatch("makePortfolioInDb", newPortData)
          .then(result => {
            console.log(result);
          })
          .catch(err => {
            console.error(err);
          });
      } else alert("We both know you dont got that much");
    }
  },
  computed: {
    havePortfolioData(): boolean {
      return (
        store.getters[portfolioStoreSchema.getters.getMyPortfolio].id ===
        store.getters[accountStoreSchema.getters.getMyAccont].uid
      );
    },
    signedIn(): boolean {
      return store.getters[accountStoreSchema.getters.getSignedInStatus];
    },
    myStockData() {
      let allStocks: Array<userStock> = [];
      let stockNames: Array<string> = this.myPortfolio.getCurrentlyOwnedStocks();
      console.log(stockNames);
      stockNames.forEach(stockName => {
        let stockData: userStock | undefined = this.myPortfolio.getStockData(
          stockName
        );
        console.log(stockData);
        if (stockData != undefined) allStocks.push(stockData);
      });
      console.log(allStocks);
      return allStocks;
    },
    myPortfolio(): Portfolio {
      return store.getters[portfolioStoreSchema.getters.getMyPortfolio];
    }
  }
});
</script>