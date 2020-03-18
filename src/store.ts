import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    stocks: [
      {
        name: "BMW",
        value: 200 + "$",
        stockQuantity: 100 // ? Dev Note: why cant this just be a string of "200$" or a number of 200.
      },
      {
        name: "Google",
        value: 150 + "$",
        stockQuantity: 599
      },
      {
        name: "Apple",
        value: 1000 + "$",
        stockQuantity: 1233
      },
      {
        name: "Twitter",
        value: 100 + "$",
        stockQuantity: 100
      }
    ],
    portfolio: [
      {
        funds: 10000 + "$" // Could add this to portfolio class
      }
    ],
  },
  getters: {
    // I would rename to getTotalFunds
    totalFunds: state => {
      return state.portfolio[0].funds;
    },
    getStocks: state => {
      return state.stocks;
    },
    getUserStocks: state => {
      return state.portfolio;
    }
  },
  mutations: {
    buyNewStock(state, newStock) {
      state.portfolio.push(newStock);

    },
    buyMoreStock(state, payload) {
      console.log(state, payload)
      state.portfolio.forEach((element, index) => {
        console.log(element, index)
        if (element[index].name == payload.name) {
          element[index].stockQuantity = payload.stockQuantity
        }
      });
      // let index = 0
      // state.portfolio
    }
  },
  actions: {}
});
