<template>
  <div>
    <b-card
      border-variant="primary"
      header-bg-variant="success"
      header-text-variant="white"
      align="center"
      :title="stock.stockName"
    >
      <b-card-text> {{ stock.stockData.priceAtTransaction }} $ </b-card-text>
      <b-card-text>
        Amount Of Stock Owned: {{ stock.stockData.amount }}
      </b-card-text>
      <b-button variant="success" @click="sellStock(stock, 1)">Sell</b-button>
      <b-row class="my-1">
        <b-col sm="3"></b-col>
        <b-col sm="9">
          <b-form-input type="number"></b-form-input>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script lang="ts">
/* eslint-disable */
import Vue from "vue";
interface stock {
  name: string;
  value: number;
}
export default Vue.extend({
  props: ["stock"],
});
</script>

<style></style>
