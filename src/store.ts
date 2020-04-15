import Vue from "vue";
import Vuex from "vuex";
import marketData from "@/storeModules/marketData";
import portfolioData from "@/storeModules/portfolio";
// import { userPriceHistory, newStockTransaction } from "./Classes/TradeStocks";

Vue.use(Vuex);

// I dont know what this is for I just saw it breaking things so I took it out
// let newStockPurchaseData: stockTransactionData = {
//   priceAtTransaction: data.stockData.priceAtTransaction,
//   amount: data.stockData.amount,
//   time: data.stockData.time
// };
// // ! Need to add a limit of how many stocks a user can buy once they hit zero.
// let userFunds = state.portfolio.funds
// let latestUserFunds = userFunds.slice(-1)[0]
// state.portfolio.latestUserFunds = latestUserFunds
// let totalCost = newStockPurchaseData.priceAtTransaction * Number(newStockPurchaseData.amount)
// let newFundsTotal = latestUserFunds.funds - totalCost
// latestUserFunds.funds = newFundsTotal
// state.portfolio.latestUserFunds = newFundsTotal
// let userFundsData: userPriceHistory = {
//   time: new Date()
// }
// if (data.alreadyHaveStock) {
//   state.portfolio.myStocks.forEach(stock => {
//     if (stock.name === data.stockName) {
//       stock.stocksOwned.push(newStockPurchaseData);
//       userFunds.push(userFundsData)
//     }
//   });
// } else {
//   let newStock: userStock = {
//     name: data.stockName,
//     stocksOwned: [newStockPurchaseData]
//   };
//   userFunds.push(userFundsData)
//   state.portfolio.myStocks.push(newStock);
// }

export default new Vuex.Store({
  state: {
    // I dont know how you wanna format it so I commented it out
    // portfolio: {
    //   latestUserFunds: 0,
    //   funds: [],
    // },
  },
  getters: {},
  mutations: {
    // updateUserFunds(state, userFundsData: userPriceHistory) {
    //   state.portfolio.latestUserFunds = userFundsData.funds;
    //   state.portfolio.funds.push(userFundsData);
    // },
  },
  actions: {
    buyStock({ commit, getters }, transactionData: newStockTransaction) {
      if (getters.ownStock(transactionData.stockName) && getters.getLatestUserFunds > 0 == true) {
        transactionData.alreadyHaveStock = true;
        commit("updateStocksBuy", transactionData);
      } else if (getters.getLatestUserFunds > 0 == true) {
        commit("updateStocksBuy", transactionData);
      }
    },
  },
  modules: {
    marketData,
    portfolioData,
  },
});

export interface newStockTransaction {
  stockName: string;
  stockData: stockTransactionData;
  buy: boolean; // if false it is sell
  alreadyHaveStock?: boolean;
}

export interface stockTransactionData {
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
  time: Date;
}

export interface apiStockData {
  name: string;
}

export let storeSchema = {
  mutations: {
    buyNewStock: "buyNewStock",
    buyMoreStock: "buyMoreStock",
  },
};
