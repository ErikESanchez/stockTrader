<template>
  <div>
    <div class="card bg-dark text-white container" style="margin-bottom: 5px">
      <div class="card-body text-center">
        <router-link :to="stockRoute" class="text-white">
          <h5 class="card-title">{{ stock.name }}</h5>
        </router-link>
        <p class="card-text">Share: {{ ownedStock.owned }}</p>
        <p class="card-text">
          Price:
          {{ stock["high"] }}
        </p>
        <div v-if="ownedStock.owned >= amountToSell">
          <button class="btn btn-light" @click="sellStock(stock)">
            Sell Stock
          </button>
          <!-- <modal :stock="stock" :amountToSell="amountToSell" /> -->
        </div>
        <div v-else>
          <!-- Put a popover here signifying need more stocks to sell -->
          <button class="btn btn-light" disabled>Sell Stock</button>
        </div>

        <input
          class="input-group-text"
          style="margin-top: 5px"
          type="number"
          :min="1"
          v-model="amountToSell"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { NewStockTransaction } from "@/interfaces/global.interface";
import store from "../store";
// import Modal from "./Modal.vue";
import { FormattedStock } from "@/interfaces/market.interface";
export default Vue.extend({
  // todo typecast props
  props: ["stock", "ownedStock"],
  computed: {
    modalName() {
      // ??? I don't know why this keeps popping up
      return `#${this.stock.symbol}`;
    },
  },
  data() {
    return {
      stockRoute: "stocks/" + this.stock.name,
      amountToSell: 1,
    };
  },

  methods: {
    sellStock(stock: FormattedStock) {
      // *Change selling logic to conform with all the data in the stock parameter
      let sellStockTransaction: NewStockTransaction = {
        symbol: stock.symbol,
        priceAtTransaction: stock["high"],
        amount: Number(-this.amountToSell),
        time: new Date().toString(),
      };
      store.dispatch("portfolio/sellStock", sellStockTransaction);
    },
  },
});
</script>

<style></style>
