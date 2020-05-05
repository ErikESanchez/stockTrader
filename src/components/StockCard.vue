<template>
  <div>
    <!-- Todo: Add the symbol, make it dynamically go to route  -->
    <!-- Todo: add json file of all symbols to look up  -->

    <b-card
      border-variant="primary"
      header-bg-variant="success"
      header-text-variant="white"
      align="center"
    >
      <b-card-text>
        <!-- !: Miss clicks -->
        <div @click="goToSingleStockRoute()">{{ stock.name }}: ${{ stock.price }}</div>
      </b-card-text>
      <b-row>
        <b-col sm="6">
          <b-row>
            <b-col sm="6">
              <b-form-input type="number" v-model="amountToSell"></b-form-input>
            </b-col>
            <b-col sm="6">
              <b-button variant="danger" @click="sellStock(stock, amountToSell)">Sell</b-button>
            </b-col>
          </b-row>
      {{ stock[keyProp]["stockData"]["name"] }}
      <b-card-text>Price: {{ stock[keyProp]["stockData"]["open"] }}</b-card-text>
      <b-card-text>Date Of Data: {{ stock[keyProp]["stockData"]["lastRefreshed"]}}</b-card-text>
      <b-card-text>Volume: {{ stock[keyProp]["stockData"]["volume"] }}</b-card-text>
      <b-button variant="success" @click="buyStock(stock, 1)">Buy</b-button>
      <b-row class="my-1">
        <b-col sm="3"></b-col>
        <b-col sm="9">
          <b-form-input type="number" v-model="amountToBuy"></b-form-input>
        </b-col>
        <b-col sm="6">
          <b-row>
            <b-col>
              <b-form-input type="number" v-model="amountToBuy"></b-form-input>
            </b-col>
            <b-col>
              <b-button variant="success" @click="buyStock(stock, amountToBuy)">Buy</b-button>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { newStockTransaction } from "@/store";
import { newStockTransaction } from "@/Classes/Portfolio";
import {
  storeTransaction,
  portfolioStoreSchema
} from "@/storeModules/portfolioStore";
import store from "../store";
import { Stock } from "@/Classes/Stock";
import router from "@/router";

export default Vue.extend({
  data() {
    return {
      // Set the default to Type of Number
      amountToBuy: 0,
      amountToSell: 0
    };
  },
  props: {
    stock: Stock
  },
  mounted() {},
  methods: {
    // ? Could add a converter
    buyStock(stock: Stock) {
      let formatedStoreTr: storeTransaction = {
        portfolioId:
          store.getters[portfolioStoreSchema.getters.getMyPortfolioId],
        trData: {
          stockName: stock.name,
          stockData: {
            priceAtTransaction: stock.price,
            amount: Number(this.amountToBuy),
            time: new Date()
          }
        }
      };
      store.dispatch("buyStock", formatedStoreTr);
      console.log(store.getters.getMyPortfolio);
    },
    sellStock(stock: Stock) {
      let formatedStoreTr: storeTransaction = {
        portfolioId:
          store.getters[portfolioStoreSchema.getters.getMyPortfolioId],
        trData: {
          stockName: stock.name,
          stockData: {
            priceAtTransaction: stock.price,
            amount: Number(this.amountToSell),
            time: new Date()
          }
        }
      };
      store.dispatch("sellStock", formatedStoreTr);
    },
    goToSingleStockRoute() {
      router.push({
        name: "singleStock",
        params: {
          stock: this.stock.getStockSymbol()
        }
      });
    }
  }
});
</script>

<style>
</style>