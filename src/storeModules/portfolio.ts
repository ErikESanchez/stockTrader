import { ActionTree } from "vuex";
import { GetterTree } from "vuex";
import { MutationTree } from "vuex";
// Todo: updateTotalFunds

const state = {
  funds: 10000,
  myStocks: Array<userStock>(),
  historyOfTrades: Array<userStock>()
};
const getters: GetterTree<any, any> = {
  getTotalFunds: state => {
    return state.portfolio.funds;
  },
  getAllStocks: state => {
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
};
const mutations: MutationTree<any> = {
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
};
const actions: ActionTree<any, any> = {
  buyStock({ commit, getters }, transactionData: newStockTransaction) {
    if (getters.ownStock(transactionData.stockName)) {
      transactionData.alreadyHaveStock = true;
      commit("updateStocksBuy", transactionData);
    } else {
      commit("updateStocksBuy", transactionData);
    }
  }
  // sellStock({ commit, getters }, transactionData: newStockTransaction) {}
};

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

export default {
  actions,
  mutations,
  getters,
  state
};
