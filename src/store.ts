import Vue from "vue";
// { Store }
import Vuex from "vuex";
// TOdo: store modules 
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
    portfolio: {
      funds: 10000 + "$",
      stocks: []
    }
  },
  getters: {
    getTotalFunds: state => {
      return state.portfolio.funds;
    },
    getAllStocks: state => {
      return state.stocks;
    },
    getUserStocks: state => {
      return state.portfolio.stocks;
    },
  },
  mutations: {
    buyNewStock(state, newStock) {
      state.portfolio.stocks.push(newStock);

    },
    buyMoreStock(state, payload) {
      let userStocksQuantity = []
      userStocksQuantity.push(payload.stockQuantity)
      let userStocks = state.portfolio.stocks
      let allStocks = state.stocks
      userStocks.forEach((stock, index) => {
        console.log("all stocks quantity", allStocks[index].stockQuantity)
        if (allStocks[index].name == payload.stockName) {
          let newAllStockQuantity = allStocks[index].stockQuantity - payload.stockQuantity
          state.stocks[index].stockQuantity = newAllStockQuantity
          payload.stockQuantity = +payload.stockQuantity
          userStocks[index].stockQuantity = +userStocks[index].stockQuantity
          let newUserStockQuantity = userStocks[index].stockQuantity + payload.stockQuantity
          state.portfolio.stocks[index].stockQuantity = newUserStockQuantity
          console.log(typeof payload.stockQuantity, "newuserestockq", newUserStockQuantity)
        }
      });
    }
  },
  actions: {}
});

export let storeSchema = {
  mutations: {
    buyNewStock: "buyNewStock",
    buyMoreStock: 'buyMoreStock'
  },
}