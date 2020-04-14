<template>
  <div>
    <b-card
      border-variant="primary"
      header-bg-variant="success"
      header-text-variant="white"
      align="center"
      :key="stock.name"
    >
      {{ stock.name }}
      <!-- With the prop either make a for loop to loop through all the indexes, or make a function to do so, 
      probaly going to have to do it with a function-->
      <b-card-text>Amount Of Stock Owned: {{ stockAmount }}</b-card-text>
      <b-button variant="success" @click="sellStock(stock, 1)">Sell</b-button>
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
/* eslint-disable */
import Vue from "vue";
interface stock {
  name: string;
  value: number;
}
export default Vue.extend({
  props: {
    stock: Object,
    stockAmount: Number
  },
  data() {
    return {
      amountToSell: 0
    };
  },
  methods: {
    sellStock(stock, amount?) {
      console.log(stock);
    }
  },
  mounted() {
    console.log(this.stock);
  }
});
</script>

<style>
</style>