<template>
  <div>
    <!-- Goal is to make this dynamic so it can render as much data as store sends -->
    <b-card-group deck class="card-group">
      <!-- Maybe use string interpolation to set the header???? -->
      <b-card
        border-variant="primary"
        header="`{stock}`"
        header-bg-variant="success"
        header-text-variant="white"
        align="center"
        v-for="stock in stocks"
        :key="stock.data"
        v-model="toBuy"
      >
        {{ stock.name }}
        <b-card-text>Price: {{ stock.value }}</b-card-text>
        <b-button variant="success" @click="bought">Buy</b-button>
        <b-row class="my-1" v-for="type in types" :key="type">
          <b-col sm="3">
            <label :for="`type-${type}`">
              Type
              <code>{{ type }}</code>:
            </label>
          </b-col>
          <b-col sm="9">
            <b-form-input :id="`type-${type}`" :type="type">{{toBuy}}</b-form-input>
          </b-col>
        </b-row>
      </b-card>
    </b-card-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      stocks: null,
      toBuy: 1,
      types: ["number"]
    };
  },

  methods: {
    stockGetter() {
      this.stocks = this.$store.getters.stockGetter;
      console.log(this.stocks);
    },
    newPrices() {
      this.BMW_Stock = this.$store.commit(
        "generateStockPrices",
        this.BMW_Stock
      );
    },
    bought() {
      console.log(this.stocks);
      this.$store.commit("userBoughtStocks", this.toBuy);
      console.log(this.$store.getters.userStocksGetters);
    }
  },
  async beforeMount() {
    await this.stockGetter();
  }
};
</script>

<style scoped>
.card-group {
  margin: 30px;
}
</style>