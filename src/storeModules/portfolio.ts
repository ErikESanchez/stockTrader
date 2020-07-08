import Vue from "vue";
import { ActionTree, GetterTree, MutationTree } from "vuex";
import { Portfolio, newStockTransaction } from "@/Classes/Portfolio";

const state = {
  funds: 10000,
  myStocks: Array<userStock>(),
  historyOfTrades: Array<userStock>(),
  portfolioClass: Portfolio,
};
const getters: GetterTree<any, any> = {
  getPortfolioClass(state: any) {
    return state.portfolioClass;
  },
  getTotalFunds: (state) => {
    return state.funds;
  },
  getAllStocks: (state) => {
    return state.stocks;
  },
  getUserStocks: (state) => {
    return state.myStocks;
  },
  ownStock: (state) => (stockName: string): boolean => {
    let doIOwnStock = false;
    state.myStocks.forEach((stock: userStock) => {
      if (stock.name === stockName) {
        doIOwnStock = true;
      }
    });
    return doIOwnStock;
  },
};
const mutations: MutationTree<any> = {
  setPortfolioClass(state, portfolio: Portfolio) {
    Vue.set(state, "portfolioClass", portfolio);
  },
  updateFunds(state, priceDifference: number) {
    state.funds += priceDifference;
  },
  // updateStocksBuy(state, data: newStockTransaction) {
  //   let newStockPurchaseData: stockTransactionData = {
  //     priceAtTransaction: data.stockData.priceAtTransaction,
  //     amount: data.stockData.amount,
  //     time: data.stockData.time,
  //   };

  //   if (data.alreadyHaveStock) {
  //     state.portfolio.myStocks.forEach((stock: userStock) => {
  //       if (stock.name === data.stockName) {
  //         stock.stocksOwned.push(newStockPurchaseData);
  //       }
  //     });
  //   } else {
  //     let newStock: userStock = {
  //       name: data.stockName,
  //       stocksOwned: [newStockPurchaseData],
  //     };
  //     state.portfolio.myStocks.push(newStock);
  //   }

  //   console.log("Update Stock with a BUY");
  // },
  // updateStocksSell(state, data: newStockTransaction) {}
};
const actions: ActionTree<any, any> = {
  buyStock({ state }, stockTransaction: newStockTransaction) {
    state.portfolioClass.buyStock(stockTransaction);
    // console.log(stockTransaction);
  },
  getUserFirebaseStocks({ state }) {
    console.log(state.portfolioClass);
    state.portfolioClass.getUserFirebaseStocks();
  },
  // buyStock({ commit, }, transactionData: newStockTransaction) {
  //   if (getters.ownStock(transactionData.stockName)) {
  //     transactionData.alreadyHaveStock = true;
  //     commit("updateStocksBuy", transactionData);
  //   } else {
  //     commit("updateStocksBuy", transactionData);
  //   }
  //   commit(
  //     "updateFunds",
  //     transactionData.stockData.amount * transactionData.stockData.priceAtTransaction
  //   );
  // },
  // sellStock({ commit, getters }, transactionData: newStockTransaction) {}
};

interface stockTransactionData {
  priceAtTransaction: number;
  amount: number;
  time: Date;
}

interface userStock {
  name: string;
  stocksOwned: Array<stockTransactionData>;
}

export default {
  namespaced: true,
  actions,
  mutations,
  getters,
  state,
};
