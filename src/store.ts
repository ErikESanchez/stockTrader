import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    stocks: [
      {
        name: "BMW",
        value: 200,
        stockQuantity: 100
      },
      {
        name: "Google",
        value: 150,
        stockQuantity: 599
      },
      {
        name: "Apple",
        value: 1000,
        stockQuantity: 1233
      },
      {
        name: "Twitter",
        value: 100,
        stockQuantity: 100
      }
    ],
    portfolio: {
      funds: 10000,
      myStocks: Array<userStock>()
    }
  },

  getters: {
    getTotalFunds: state => {
      return state.portfolio[0].funds;
    },
    getStocks: state => {
      return state.stocks;
    },
    getUserStocks: state => {
      return state.portfolio.myStocks;
    },
    ownStock: state => (stockName: string): boolean => {
      let doIOwnStock = false;
      state.portfolio.myStocks.forEach(stock => {
        if (stock.name === stockName) {
          doIOwnStock = true;
        }
      });
      return doIOwnStock;
    }
  },
  mutations: {
    updateStocksBuy(state, data: newStockTransaction) {
      let newStockPurchaseData: stockTransactionData = {
        priceAtTransaction: data.stockData.priceAtTransaction,
        amount: data.stockData.amount,
        time: data.stockData.time
      };
      if (data.alreadyHaveStock) {
        state.portfolio.myStocks.forEach(stock => {
          if (stock.name === data.stockName) {
            stock.stocksOwned.push(newStockPurchaseData);
          }
        });
      } else {
        let newStock: userStock = {
          name: data.stockName,
          stocksOwned: [newStockPurchaseData]
        };
        state.portfolio.myStocks.push(newStock);
      }
      console.log("Update Stock with a BUY");
    }
    // updateStocksSell(state, data: newStockTransaction) {}
  },
  actions: {
    buyStock({ commit, getters }, transactionData: newStockTransaction) {
      if (getters.ownStock(transactionData.stockName)) {
        transactionData.alreadyHaveStock = true;
        commit("updateStocksBuy", transactionData);
      } else {
        commit("updateStocksBuy", transactionData);
      }
    }
    // sellStock({ commit, getters }, transactionData: newStockTransaction) {}
  }
});

export interface newStockTransaction {
  stockName: string;
  stockData: stockTransactionData;
  buy: boolean; // if false it is sell
  alreadyHaveStock?: boolean;
}

interface stockTransactionData {
  priceAtTransaction: number;
  amount: number;
  time: Date;
}

interface userStock {
  name: string;
  stocksOwned: Array<stockTransactionData>;
}
