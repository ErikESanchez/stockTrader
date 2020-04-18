<template>
  <div>
    {{stock.name}}
    <b-card
      border-variant="primary"
      header-bg-variant="success"
      header-text-variant="white"
      align="center"
      :key="stock.name"
    >
      {{ stock.name }}
      <b-card-text>Amount Of Stock Owned: {{ stock.totalAmountShares }}</b-card-text>
      <b-button variant="danger" @click="sellStock(stock)">Sell</b-button>
      <b-row class="my-1">
        <b-col sm="3"></b-col>
        <b-col sm="9">
          <b-form-input type="number" v-model="amountToSell"></b-form-input>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Stock } from "../Classes/Stock";
import { Portfolio, userStock } from "@/Classes/Portfolio";
import { newStockTransaction } from "@/Classes/Portfolio";
import {
  storeTransaction,
  portfolioStoreSchema
} from "@/storeModules/portfolioStore";
import store from "../store";

export default Vue.extend({
  props: {
    stock: Object //userStock
  },
  data() {
    return {
      amountToSell: 0
    };
  },
  methods: {
    sellStock(stock: userStock) {
      let formatedStoreTr: storeTransaction = {
        portfolioId:
          store.getters[portfolioStoreSchema.getters.getMyPortfolioId],
        trData: {
          stockName: stock.name,
          stockData: {
            priceAtTransaction: 100, // Todo: update the market in vuex and add it here || or find another way to get the time price update of data
            amount: this.amountToSell,
            time: new Date()
          }
        }
      };
      store.dispatch("sellStock", formatedStoreTr);
    }
  }
});
</script>

<style>
</style>