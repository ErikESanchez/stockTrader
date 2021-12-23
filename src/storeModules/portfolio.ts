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
import { Portfolio } from "@/Classes/Portfolio";
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
    let localPortfolio: UserPortfolio = getters.portfolio;
    let portfolioCollection = collection(firestore, "portfolios");
    let portfolioUserDocument = doc(portfolioCollection, uid);
    // * Updating firebase values

    console.log(stockTransaction);
    setDoc(
      portfolioUserDocument,
      {
        ownedStocks: {
          [stockTransaction.symbol]: {
            owned:
              localPortfolio.ownedStocks[stockTransaction.symbol].owned +
              stockTransaction.data.amount,
            transctions: {
              [stockTransaction.data.time]: {
                amount: stockTransaction.data.amount,
                priceAtTransaction: stockTransaction.data.priceAtTransaction,
              },
            },
          },
        },
      },
      { merge: true }
    );

    // let tran: FirebaseStockTransactions = {
    //   priceAtTransaction: stockTransaction.data.priceAtTransaction,
    //   timeOfTransaction: stockTransaction.data.time,
    //   quantity: stockTransaction.data.amount
    // }

    //       doc(collection(firestore, "portfolios")state.uid)
    //       .doc(state.uid as string)
    //       // todo: maybe change this to update ╰(*°▽°*)╯
    //       .set(
    //         {
    //           availableFunds: portfolioClass.calculateBoughtAvailableFunds(),
    //           ownedStocks: {
    //             [stockTransaction.symbol]: {
    //               amountOwned: stockTransaction.data.amount,
    //               symbol: stockTransaction.symbol,
    //               name: stockTransaction.name,
    //             },
    //           },
    //           portfolioWorth: portfolioClass.calculateBoughtPortfolioWorth(),
    //         },
    //         { merge: true }
    //       );
    // if (portfolio.ownedStocks[`${stockTransaction.symbol}`]) {
    //   console.log(`You own ${stockTransaction.symbol}, adding to portfolio`);
    //   portfolio = {
    //     availableFunds: portfolioClass.calculateBoughtAvailableFunds(),
    //     ownedStocks: {
    //       [stockTransaction.symbol]: {
    //         symbol: stockTransaction.symbol,
    //         amountOwned:
    //           portfolio.ownedStocks[stockTransaction.symbol].amountOwned +
    //           stockTransaction.data.amount,
    //       },
    //     },
    //     portfolioWorth: portfolioClass.calculateBoughtPortfolioWorth(),
    //   };
    //   await firebaseData
    //     .firestore()
    //     .collection("portfolios")
    //     .doc(state.uid)
    //     .set(
    //       {
    //         availableFunds: portfolio.availableFunds,
    //         ownedStocks: portfolio.ownedStocks,
    //         portfolioWorth: portfolio.portfolioWorth,
    //       },
    //       { merge: true }
    //     );
    //   commit("setUserPortfolio", portfolio);
    //   dispatch("getAllDBPortfolios", state.uid);
    // } else if (
    //   portfolio.ownedStocks[`${stockTransaction.symbol}`] === undefined
    // ) {

    //   dispatch("getAllDBPortfolios", state.uid);
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

export interface UserPortfolio {
  funds: number;
  name?: string;
  ownedStocks: FirebaseStockInfo;
  portfolioWorth: number;
  photoURL?: string;
}

interface UserPortfoliosDoc {
  [id: string]: any;
}

export interface FirebaseStockInfo {
  [symbol: string]: {
    owned: number;
    transactions: Array<FirebaseStockTransactions>;
  };
}

interface FirebaseStockTransactions {
  priceAtTransaction: number;
  quantity: number;
  timeOfTransaction: Date;
}

export interface newStockTransaction {
  symbol: string;
  data: stockTransactionData;
}

interface stockTransactionData {
  priceAtTransaction: number;
  amount: number;
  time: string;
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
