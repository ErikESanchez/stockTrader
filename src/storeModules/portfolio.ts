import Vue from "vue";
import { ActionTree, GetterTree, MutationTree } from "vuex";
import { newStockTransaction, UserPortfolio } from "@/Classes/Portfolio";
import { firebaseData } from "@/firebase";
import { Stock } from "@/Classes/Stock";
import { firestore, User } from "firebase";

const state: State = {
  funds: Number(),
  portfolio: Object(),
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
  async setPortfolio({ state, rootState }) {
    const user = rootState.userModule.user;
    await Promise.resolve(
      firebaseData
        .firestore()
        .collection("portfolios")
        .doc(user.uid)
        .get()
        .then((doc: doc) => {
          console.log(doc.id, "=>", doc.data());
          return doc.data() as UserPortfolio;
        })
    ).then(async (portfolio: UserPortfolio) => {
      if (portfolio === undefined || Object.keys(portfolio).length === 0) {
        await firebaseData
          .firestore()
          .collection("portfolios")
          .doc(user.uid as string)
          .set({
            availableFunds: 10000,
            name: user.displayName || user.email,
            ownedStocks: {},
            portfolioWorth: 0,
          });
        state.portfolio = portfolio;
      } else {
        state.portfolio = portfolio;
      }
    });
  },
  async buyStock(
    { state, dispatch, rootState },
    stockTransaction: newStockTransaction
  ) {
    let stockClass: Stock = new Stock(
      stockTransaction.stockData.priceAtTransaction,
      stockTransaction.stockData.amount,
      stockTransaction.stockName
    );
    let portfolio: UserPortfolio = state.portfolio;
    const user = rootState.userModule.user;
    console.log(portfolio);

    if (portfolio.ownedStocks[stockTransaction.stockName]) {
      console.log("update");
      await firebaseData
        .firestore()
        .collection("portfolios")
        .doc(user.uid)
        .update({
          // availableFunds:
          //   portfolio.availableFunds -
          //   stockTransaction.stockData.priceAtTransaction,
          // name: portfolio.name,

          // ["ownedStocks." + stockTransaction.stockName + ".amountOwned"]:
          //   portfolio.ownedStocks[stockTransaction.stockName].amountOwned +
          //   stockTransaction.stockData.amount,

          ["ownedStocks"]: {
            [stockTransaction.stockName]: {
              ["amountOwned"]:
                portfolio.ownedStocks[stockTransaction.stockName].amountOwned +
                stockTransaction.stockData.amount,
            },
          },
          // ownedStocks: firestore.FieldValue.arrayUnion(stockTransaction),
        });
      dispatch("setPortfolio");
    } else {
      console.log("set");
      await firebaseData
        .firestore()
        .collection("portfolios")
        .doc(user.uid)
        .set(
          {
            availableFunds:
              portfolio.availableFunds -
              stockTransaction.stockData.priceAtTransaction,
            ownedStocks: {
              [stockTransaction.stockName]: {
                amountOwned: stockTransaction.stockData.amount,
                symbol: stockTransaction.stockName,
              },
            },
          },
          { merge: true }
        );
      dispatch("setPortfolio");
    }
    // else {
    // await firebaseData.firestore().collection("portfolios").doc(user.uid).set
    // }

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
