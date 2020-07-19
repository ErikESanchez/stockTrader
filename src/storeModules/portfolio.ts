import Vue from "vue";
import { ActionTree, GetterTree, MutationTree } from "vuex";
import { newStockTransaction, UserPortfolio } from "@/Classes/Portfolio";
import { firebaseData } from "@/firebase";
import { Stock } from "@/Classes/Stock";
import { firestore, User } from "firebase";
import { merge } from "jquery";

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
        await firebaseData
          .firestore()
          .collection("portfolios")
          .doc(user.uid as string)
          .update({
            ownedStocks: portfolio.ownedStocks,
          });
        console.log(portfolio);
      }
    });
  },
  async buyStock(
    { state, dispatch, rootState },
    stockTransaction: newStockTransaction
  ) {
    // let stockClass: Stock = new Stock(
    //   stockTransaction.stockData.priceAtTransaction,
    //   stockTransaction.stockData.amount,
    //   stockTransaction.stockName
    // );
    let portfolio: UserPortfolio = state.portfolio;
    const user = rootState.userModule.user;
    if (Object.keys(portfolio.ownedStocks).length === 0) {
      console.log("need to make a new stock to loop through");
      await firebaseData
        .firestore()
        .collection("portfolios")
        .doc(user.uid)
        .update({
          ownedStocks: {
            [stockTransaction.stockName]: {
              amountOwned: stockTransaction.stockData.amount,
              symbol: stockTransaction.stockName,
            },
          },
        });
      dispatch("setPortfolio");
    } else {
      console.log("just loop through the stocks");
      Object.keys(portfolio.ownedStocks).forEach(
        async (symbol: string, index: number, arr: Array<string>) => {
          console.log("Symbol", symbol);
          if (stockTransaction.stockName === symbol) {
            console.log(`User owns a ${stockTransaction.stockName} stock`);
            await firebaseData
              .firestore()
              .collection("portfolios")
              .doc(user.uid)
              .set(
                {
                  // availableFunds:
                  //   portfolio.availableFunds -
                  //   stockTransaction.stockData.priceAtTransaction,
                  // name: portfolio.name,
                  // ["ownedStocks." + stockTransaction.stockName + ".amountOwned"]:
                  //   portfolio.ownedStocks[stockTransaction.stockName].amountOwned +
                  //   stockTransaction.stockData.amount,
                  ownedStocks: {
                    [stockTransaction.stockName]: {
                      symbol: stockTransaction.stockName,
                      amountOwned:
                        portfolio.ownedStocks[stockTransaction.stockName]
                          .amountOwned + stockTransaction.stockData.amount,
                    },
                  },
                  // ownedStocks: firestore.FieldValue.arrayUnion(stockTransaction),
                },
                { merge: true }
              );
            dispatch("setPortfolio");
          } else if (
            index === arr.length - 1 &&
            stockTransaction.stockName !== symbol
          ) {
            console.log(
              `User does not own a ${stockTransaction.stockName} stock`
            );
            await firebaseData
              .firestore()
              .collection("portfolios")
              .doc(user.uid)
              // todo: maybe change this to update ╰(*°▽°*)╯
              .set(
                {
                  // availableFunds:
                  //   portfolio.availableFunds -
                  //   stockTransaction.stockData.priceAtTransaction,
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
        }
      );
    }
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
