import Vue from "vue";
import Vuex from "vuex";
import marketData from "./storeModules/marketData";
import userModule from "./storeModules/userModule";
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    marketData,
    userModule
  },
  state: {

    portfolio: {
      funds: Array<userPriceHistory>(),
      latestUserFunds: Number,
      myStocks: Array<userStock>(),
      historyOfTrades: Array<userStock>()
    }
  },

  getters: {
    getUserFunds: state => {
      return state.portfolio.funds;
    },
    getLatestUserFunds: state => {
      return state.portfolio.latestUserFunds
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
    // updateStocksBuy(state, data: newStockTransaction) {

    //   let newStockPurchaseData: stockTransactionData = {
    //     priceAtTransaction: data.stockData.priceAtTransaction,
    //     amount: data.stockData.amount,
    //     time: data.stockData.time
    //   };
    //   // ! Need to add a limit of how many stocks a user can buy once they hit zero.
    //   let userFunds = state.portfolio.funds
    //   let latestUserFunds = userFunds.slice(-1)[0]
    //   state.portfolio.latestUserFunds = latestUserFunds
    //   let totalCost = newStockPurchaseData.priceAtTransaction * Number(newStockPurchaseData.amount)
    //   let newFundsTotal = latestUserFunds.funds - totalCost
    //   latestUserFunds.funds = newFundsTotal
    //   state.portfolio.latestUserFunds = newFundsTotal
    //   let userFundsData: userPriceHistory = {
    //     funds: newFundsTotal,
    //     time: new Date()
    //   }
    //   if (data.alreadyHaveStock) {
    //     state.portfolio.myStocks.forEach(stock => {
    //       if (stock.name === data.stockName) {
    //         stock.stocksOwned.push(newStockPurchaseData);
    //         userFunds.push(userFundsData)
    //       }
    //     });
    //   } else {
    //     let newStock: userStock = {
    //       name: data.stockName,
    //       stocksOwned: [newStockPurchaseData]
    //     };
    //     userFunds.push(userFundsData)
    //     state.portfolio.myStocks.push(newStock);
    //   }
    //   // * Latest funds 
    //   // * console.log(state.portfolio.funds.slice(-1)[0])
    // },
    updateUserFunds(state) {
      let userFundsData: userPriceHistory = {
        funds: 1000,
        time: new Date()
      }
      state.portfolio.latestUserFunds = userFundsData.funds
      state.portfolio.funds.push(userFundsData)
    }
    // updateStocksSell(state, data: newStockTransaction) {}
  },
  actions: {
    buyStock({ commit, getters }, transactionData: newStockTransaction) {
      if (getters.ownStock(transactionData.stockName) && getters.getLatestUserFunds > 0 == true) {
        transactionData.alreadyHaveStock = true;
        commit("updateStocksBuy", transactionData);
      } else if (getters.getLatestUserFunds > 0 == true) {
        commit("updateStocksBuy", transactionData);
      }
    }
    // sellStock({ commit, getters }, transactionData: newStockTransaction) {}
  },

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

export interface userStock {
  name: string;
  stocksOwned: Array<stockTransactionData>;
}

export interface userPriceHistory {
  funds: number;
  time: Date
}

export interface apiStockData {
  name: string;
}

export let storeSchema = {
  mutations: {
    buyNewStock: "buyNewStock",
    buyMoreStock: "buyMoreStock"
  }
};
