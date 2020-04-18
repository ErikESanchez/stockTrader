<template>
  <div>
    <b-card
      border-variant="primary"
      header-bg-variant="success"
      header-text-variant="white"
      align="center"
      :key="stock.name"
    >
      <b-card-text>{{ stock.name }}: ${{ stock.price }}</b-card-text>
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
import { newStockTransaction } from "@/Classes/Portfolio";
import {
  storeTransaction,
  portfolioStoreSchema
} from "@/storeModules/portfolioStore";
import store from "../store";
import { Stock } from "../Classes/Stock";

export default Vue.extend({
  data() {
    return {
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
            amount: this.amountToBuy,
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