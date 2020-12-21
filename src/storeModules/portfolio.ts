import Vue from "vue";
import { ActionTree, GetterTree, MutationTree } from "vuex";
import { firebaseData } from "@/firebase";
import { Portfolio } from "@/Classes/Portfolio";

const state: State = {
  funds: Number(),
  portfolio: Object(),
  userPortfolios: Array(),
  uid: String()
};
const getters: GetterTree<any, any> = {
  getTotalFunds: (state: State) => {
    return state.funds;
  },
  portfolio: (state: State) => {
    return state.portfolio;
  },
  userPortfolios: (state: State) => {
    return state.userPortfolios;
  }
};
const mutations: MutationTree<any> = {
  setAllUserPortfolios(state, portfolios: Array<UserPortfolio>) {
    state.userPortfolios = portfolios;
  },
  setUserPortfolio(state, portfolio: UserPortfolio) {
    state.portfolio = portfolio
  },
  setUid(state, uid: string) {
    state.uid = uid
  }

};
const actions: ActionTree<any, any> = {
  async getAllDBPortfolios({ commit }, uid: string) {
    let userPortfolios: Array<UserPortfolio> = []
    await firebaseData
      .firestore()
      .collection('portfolios')
      // ! I don't know why this makes three calls?
      // ? The get function just automatically makes them
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc: doc) => {
          userPortfolios.push(doc.data())
          if (doc.id === uid) {
            commit('setUserPortfolio', doc.data() as UserPortfolio)
          }
        })
      })
    commit('setAllUserPortfolios', userPortfolios as Array<UserPortfolio>)
    commit('setUid', uid)
  },
  async buyStock(
    { state, dispatch },
    stockTransaction: newStockTransaction
  ) {
    let portfolio: UserPortfolio = state.portfolio;
    let portfolioClass: Portfolio = new Portfolio(portfolio, stockTransaction);
    if (portfolio.availableFunds >= 0) {
      console.log("Bruh, you got money to own stocks");
      if (portfolio.ownedStocks[`${stockTransaction.symbol}`]) {
        console.log(`You own ${stockTransaction.symbol}, adding to portfolio`);
        await firebaseData
          .firestore()
          .collection("portfolios")
          .doc(state.uid)
          .set(
            {
              availableFunds: portfolioClass.calculateBoughtAvailableFunds(),
              ownedStocks: {
                [stockTransaction.symbol]: {
                  symbol: stockTransaction.symbol,
                  amountOwned:
                    portfolio.ownedStocks[stockTransaction.symbol].amountOwned +
                    stockTransaction.data.amount,
                },
              },
              portfolioWorth: portfolioClass.calculateBoughtPortfolioWorth(),
            },
            { merge: true }
          );
        dispatch("getAllDBPortfolios", state.uid);
      } else if (
        portfolio.ownedStocks[`${stockTransaction.symbol}`] === undefined
      ) {
        console.log(`User does not own a ${stockTransaction.symbol} stock`);
        console.log(portfolioClass.calculateBoughtPortfolioWorth());

        await firebaseData
          .firestore()
          .collection("portfolios")
          .doc(state.uid as string)
          // todo: maybe change this to update ╰(*°▽°*)╯
          .set(
            {
              availableFunds: portfolioClass.calculateBoughtAvailableFunds(),
              ownedStocks: {
                [stockTransaction.symbol]: {
                  amountOwned: stockTransaction.data.amount,
                  symbol: stockTransaction.symbol,
                },
              },
              portfolioWorth: portfolioClass.calculateBoughtPortfolioWorth(),
            },
            { merge: true }
          );
        dispatch("getAllDBPortfolios", state.uid);
      }
    } else {
      console.log("bruh you aint got money");
    }
  },
  async sellStock({ dispatch, rootState }, sellStockTransaction: newStockTransaction) {
    let portfolio: UserPortfolio = state.portfolio;
    // let portfolioClass: Portfolio = new Portfolio(portfolio, symbol) 
    if (
      portfolio.ownedStocks[sellStockTransaction.symbol].amountOwned > 0
    ) {
      rootState.marketData.formatedStocks.forEach(async (stock: any) => {
        if (stock.stockData.name === sellStockTransaction.symbol) {
          await firebaseData
            .firestore()
            .collection("portfolios")
            .doc(state.uid)
            .set(
              {
                availableFunds: portfolio.availableFunds + sellStockTransaction.data.priceAtTransaction,
                ownedStocks: {
                  [sellStockTransaction.symbol]: {
                    symbol: sellStockTransaction.symbol,
                    amountOwned: portfolio.ownedStocks[sellStockTransaction.symbol].amountOwned - 1,
                  },
                },
                portfolioWorth: portfolio.portfolioWorth - sellStockTransaction.data.priceAtTransaction,
              },
              { merge: true }
            );
          dispatch("setPortfolio");
        }
      });
    }
    else if (portfolio.ownedStocks[sellStockTransaction.symbol].amountOwned <= 0) {
      console.log('bruh')
      await firebaseData.firestore().collection("portfolios").doc(state.uid).update({
        ownedStocks: {
          // Todo: Get FieldValue.delete() to work, for some reason it's not recognized
          // Todo: Ask Brayan why this doesn't 'exist', has to be somrething in the 'firebase.ts' config file
          // ? If that doesn't work maybe it's the version of firebase, too old?
          // [sellStockTransaction.symbol]: firebaseData.firestore.FieldValue.delete()
        }
      })
      console.log("Delete")
    }
    // Todo: Create a little message popup (that doesn't interupt UX) for either insufficient funds to not stocks to sell
  },
};

interface State {
  funds: number;
  portfolio: UserPortfolio;
  userPortfolios: Object;
  uid: string;
}

export interface UserPortfolio {
  availableFunds: number;
  name: String;
  ownedStocks: firebaseStockTransaction;
  portfolioWorth: number;
}

export interface firebaseStockTransaction {
  [symbol: string]: {
    stockName: string;
    amountOwned: number;
  };
}

export interface newStockTransaction {
  symbol: string;
  data: stockTransactionData;
}

interface stockTransactionData {
  priceAtTransaction: number;
  amount: number;
  time: Date;
}

export interface stockData {
  amountOwned: number;
  symbol: string;
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
