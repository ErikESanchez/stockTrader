import Vue from "vue";
import { ActionTree, GetterTree, MutationTree } from "vuex";
import { newStockTransaction, UserPortfolio } from "@/Classes/Portfolio";
import { firebaseData } from "@/firebase";
import { firestore, User } from "firebase";
import { Stock } from "@/Classes/Stock";

const state: State = {
  funds: 10000,
  portfolio: Object(),
  uid: String(),
};
const getters: GetterTree<any, any> = {
  getTotalFunds: (state: State) => {
    return state.funds;
  },
  getPortfolio: (state: State) => {
    return state.portfolio;
  },
};
const mutations: MutationTree<any> = {};
const actions: ActionTree<any, any> = {
  getPortfolio({ state }, uid: string) {
    state.uid = uid;
    firebaseData
      .firestore()
      .collection("portfolios")
      .doc(uid)
      .get()
      .then((doc: doc) => {
        console.log(doc.id, "=>", doc.data());
        state.portfolio = doc.data() as UserPortfolio;
      });
  },
  async buyStock({ state, dispatch }, stockTransaction: newStockTransaction) {
    let stockClass: Stock = new Stock(
      stockTransaction.stockData.priceAtTransaction,
      stockTransaction.stockData.amount,
      stockTransaction.stockName
    );
    let portfolio: UserPortfolio = state.portfolio;

    if (
      Object.keys(portfolio.ownedStocks).length === 0 &&
      portfolio.ownedStocks.constructor === Object
    ) {
      await firebaseData
        .firestore()
        .collection("portfolios")
        .doc(state.uid as string)
        .set({
          // availableFunds: portfolio.availableFunds - stockClass.getTotalWorth(),
          // ownedStock:
        });
      console.log("bruh");
    }
    // if ()
    // await firebaseData
    //   .firestore()
    //   .collection("portfolios")
    //   .doc(state.uid as string)
    //   .set({
    //     availableFunds: portfolio.availableFunds - stockClass.getTotalWorth(),
    //     ownedStocks: {
    //       [stockTransaction.stockName]: {
    //         amountOwned:
    //           stockTransaction.stockData.amount +
    //           state.portfolio.ownedStocks[stockTransaction.stockName]
    //             .stocksOwned,
    //       },
    //     },
    //     ownedStocksData: firestore.FieldValue.arrayUnion(stockTransaction),
    //     portfolioWorth: portfolio.portfolioWorth + stockClass.getTotalWorth(),
    //   });
    // dispatch("getPortfolio", state.uid);
  },
};

interface State {
  funds: number;
  portfolio: UserPortfolio;
  uid: string;
}

interface TotalUserStocks {
  [name: string]: {
    stocksOwned: number;
  };
}
interface doc {
  [id: string]: any;
}

export default {
  namespaced: true,
  actions,
  mutations,
  getters,
  state,
};
