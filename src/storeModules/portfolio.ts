import { ActionTree, GetterTree, MutationTree } from "vuex";
import { auth, firestore } from "@/firebase";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  setDoc,
  runTransaction,
} from "firebase/firestore";
import { portfolioTransactionUpdate } from "@/interfaces/portfolio.interface";
import {
  newStockTransaction,
  UserPortfolio,
} from "@/interfaces/global.interface";
import store from "@/store";
const state: State = {
  portfolio: Object(),
  userPortfolios: [],
};
const getters: GetterTree<any, any> = {
  portfolio: (state: State) => {
    return state.portfolio;
  },
  userPortfolios: (state: State) => {
    return state.userPortfolios;
  },
};
const mutations: MutationTree<any> = {
  setAllUserPortfolios(state, portfolios: Array<UserPortfolio>) {
    state.userPortfolios = portfolios;
  },
  setUserPortfolio(state, portfolio: UserPortfolio) {
    state.portfolio = portfolio;
  },
};

const actions: ActionTree<any, any> = {
  async getAllPortfolios({ commit }, uid: string) {
    let localUserPortfolios: Array<UserPortfolio> = [];
    const querySnapshot = await getDocs(collection(firestore, "portfolios"));
    querySnapshot.forEach((userPortfolios: UserPortfoliosDoc) => {
      if (userPortfolios.data()) {
        localUserPortfolios.push(userPortfolios.data());
      }
      if (userPortfolios.id === uid) {
        commit("setUserPortfolio", userPortfolios.data());
      }
    });
    commit("setAllUserPortfolios", localUserPortfolios as Array<UserPortfolio>);
  },
  async buyStock(
    { commit, rootGetters, getters },
    stockTransaction: newStockTransaction
  ) {
    let uid: string = rootGetters["userModule/user"].uid;
    let symbol: string = stockTransaction.symbol;
    let localPortfolio: UserPortfolio = getters.portfolio;
    let portfolioCollection = collection(firestore, "portfolios");
    let portfolioUserDocument = doc(portfolioCollection, uid);
    // * Updating firebase values
    let updatedPortfolio = portfolioTransactionUpdate(
      localPortfolio,
      stockTransaction
    );
    let updatedOwnedStock = updatedPortfolio.ownedStocks[symbol];
    setDoc(
      portfolioUserDocument,
      {
        ownedStocks: {
          [symbol]: updatedOwnedStock,
        },
      },
      { merge: true }
    ).then(() => {
      commit("setUserPortfolio", updatedPortfolio);
    });
  },
  // async sellStock(
  //   { commit, rootState, getters },
  //   sellStockTransaction: newStockTransaction
  // ) {
  //   let userPortfolios: Array<UserPortfolio> = getters.userPortfolios;
  //   let portfolio: UserPortfolio = state.portfolio;
  //   if (portfolio.ownedStocks[sellStockTransaction.symbol].amountOwned >= 2) {
  //     rootState.marketData.formatedStocks.forEach(async (stock: any) => {
  //       if (stock.stockData.symbol === sellStockTransaction.symbol) {
  //         portfolio = {
  //           availableFunds:
  //             portfolio.availableFunds +
  //             sellStockTransaction.data.priceAtTransaction,
  //           ownedStocks: {
  //             [sellStockTransaction.symbol]: {
  //               symbol: sellStockTransaction.symbol,
  //               amountOwned:
  //                 portfolio.ownedStocks[sellStockTransaction.symbol]
  //                   .amountOwned - 1,
  //               name: sellStockTransaction.name,
  //             },
  //           },
  //           portfolioWorth:
  //             portfolio.portfolioWorth -
  //             sellStockTransaction.data.priceAtTransaction,
  //         };
  //         await firebaseData
  //           .firestore()
  //           .collection("portfolios")
  //           .doc(state.uid)
  //           .set(
  //             {
  //               availableFunds: portfolio.availableFunds,
  //               ownedStocks: portfolio.ownedStocks,
  //               portfolioWorth: portfolio.portfolioWorth,
  //             },
  //             { merge: true }
  //           );
  //         await firebaseData
  //           .firestore()
  //           .collection("portfolios")
  //           .doc(state.uid)
  //           .get()
  //           .then((doc: doc) => {
  //             if (doc.exists) {
  //               portfolio = doc.data();
  //             } else {
  //               console.log("bruh");
  //             }
  //           })
  //           .catch((error) => {
  //             console.error(error);
  //           });
  //         commit("setUserPortfolio", portfolio);
  //         userPortfolios.forEach(
  //           (loopPortfolio: UserPortfolio, index: number) => {
  //             if (portfolio.name === loopPortfolio.name) {
  //               userPortfolios[index] = portfolio;
  //             }
  //           }
  //         );
  //       }
  //     });
  //   }
  //   // ? Maybe make it 1
  //   else {
  //     delete portfolio.ownedStocks[sellStockTransaction.symbol];
  //     portfolio.availableFunds =
  //       portfolio.availableFunds + sellStockTransaction.data.priceAtTransaction;
  //     portfolio.portfolioWorth =
  //       portfolio.portfolioWorth - sellStockTransaction.data.priceAtTransaction;
  //     // portfolio = {
  //     //   availableFunds: portfolio.availableFunds + sellStockTransaction.data.priceAtTransaction,
  //     //   portfolioWorth: portfolio.portfolioWorth - sellStockTransaction.data.priceAtTransaction
  //     // },
  //     await firebaseData
  //       .firestore()
  //       .collection("portfolios")
  //       .doc(state.uid)
  //       .set(
  //         {
  //           availableFunds: portfolio.availableFunds,
  //           ownedStocks: {
  //             [sellStockTransaction.symbol]:
  //               firebase.firestore.FieldValue.delete(),
  //           },
  //           portfolioWorth: portfolio.portfolioWorth,
  //         },
  //         { merge: true }
  //       );
  //     await firebaseData
  //       .firestore()
  //       .collection("portfolios")
  //       .doc(state.uid)
  //       .get()
  //       .then((doc: doc) => {
  //         if (doc.exists) {
  //           portfolio = doc.data();
  //         }
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //       });
  //     commit("setUserPortfolio", portfolio);
  //   }
  // },
};

interface State {
  portfolio: UserPortfolio;
  userPortfolios: Object;
}

interface UserPortfoliosDoc {
  [id: string]: any;
}

export interface stockData {
  amountOwned: number;
  symbol: string;
  name: string;
}

export default {
  namespaced: true,
  actions,
  mutations,
  getters,
  state,
};
