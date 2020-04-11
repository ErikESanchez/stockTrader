// import Vue from "vue";
// import Vuex from "vuex";
// import marketData from "@/storeModules/marketData";
// import { userPriceHistory } from './Classes/TradeStocks'
// Vue.use(Vuex);

// export default new Vuex.Store({
//   state: {

//   },

//   getters: {
//     getUserFunds: state => {
//       return state.portfolio.funds;
//     },
//     getLatestUserFunds: state => {
//       return state.portfolio.latestUserFunds
//     },
//     getAllStocks: state => {
//       return state.stocks;
//     },
//     getUserStocks: state => {
//       return state.portfolio.myStocks;
//     },
//     ownStock: state => (stockName: string): boolean => {
//       let doIOwnStock = false;
//       state.portfolio.myStocks.forEach(stock => {
//         if (stock.name === stockName) {
//           doIOwnStock = true;
//         }
//       });
//       return doIOwnStock;
//     }
//   },
//   mutations: {
//     updateStocksBuy(state, data: newStockTransaction) {


//       // ! Need to add a limit of how many stocks a user can buy once they hit zero.
//       let userFunds = state.portfolio.funds
//       let latestUserFunds = userFunds.slice(-1)[0]
//       state.portfolio.latestUserFunds = latestUserFunds
//       let totalCost = newStockPurchaseData.priceAtTransaction * Number(newStockPurchaseData.amount)
//       let newFundsTotal = latestUserFunds.funds - totalCost
//       latestUserFunds.funds = newFundsTotal
//       state.portfolio.latestUserFunds = newFundsTotal
//       let userFundsData: userPriceHistory = {
//         funds: newFundsTotal,
//         time: new Date()
//       }
//       if (data.alreadyHaveStock) {
//         state.portfolio.myStocks.forEach(stock => {
//           if (stock.name === data.stockName) {
//             stock.stocksOwned.push(newStockPurchaseData);
//             userFunds.push(userFundsData)
//           }
//         });
//       } else {
//         let newStock: userStock = {
//           name: data.stockName,
//           stocksOwned: [newStockPurchaseData]
//         };
//         userFunds.push(userFundsData)
//         state.portfolio.myStocks.push(newStock);
//       }

//     },
//     updateUserFunds(state) {
//       let userFundsData: userPriceHistory = {
//         funds: 10000,
//         time: new Date()
//       }

//     }
//     // updateStocksSell(state, data: newStockTransaction) {}
//   },
//   actions: {
//     buyStock({ commit, getters }, transactionData: newStockTransaction) {
//       if (getters.ownStock(transactionData.stockName)) {
//         transactionData.alreadyHaveStock = true;
//         commit("updateStocksBuy", transactionData);
//       } else {
//         commit("updateStocksBuy", transactionData);
//       }
//     }
//     // sellStock({ commit, getters }, transactionData: newStockTransaction) {}
//   },
//   modules: {
//     marketData
//   }
// });










