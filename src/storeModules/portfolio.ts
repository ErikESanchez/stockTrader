import Vue from "vue";
import { ActionTree, GetterTree, MutationTree } from "vuex";
import { firebaseData } from "@/firebase";
import { Portfolio } from "@/Classes/Portfolio";
import firebase from "firebase";

const state: State = {
  funds: Number(),
  portfolio: Object(),
  userPortfolios: Array(),
  uid: String()
};
const getters: GetterTree<any, any> = {
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
  },
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
      .then((querySnapshot: any) => {
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
    { state, dispatch, commit },
    stockTransaction: newStockTransaction
  ) {
    let portfolio: UserPortfolio = state.portfolio;
    let portfolioClass: Portfolio = new Portfolio(portfolio, stockTransaction);
    if (portfolio.availableFunds >= 0) {
      console.log("Bruh, you got money to own stocks");
      if (portfolio.ownedStocks[`${stockTransaction.symbol}`]) {
        console.log(`You own ${stockTransaction.symbol}, adding to portfolio`);
        portfolio = {
          availableFunds: portfolioClass.calculateBoughtAvailableFunds(),
          ownedStocks: {
            [stockTransaction.symbol]: {
              symbol: stockTransaction.symbol,
              amountOwned:
                portfolio.ownedStocks[stockTransaction.symbol].amountOwned +
                stockTransaction.data.amount,
            }
          },
          portfolioWorth: portfolioClass.calculateBoughtPortfolioWorth()
        }
        await firebaseData
          .firestore()
          .collection("portfolios")
          .doc(state.uid)
          .set(
            {
              availableFunds: portfolio.availableFunds,
              ownedStocks: portfolio.ownedStocks,
              portfolioWorth: portfolio.portfolioWorth,
            },
            { merge: true }
          );
        commit('setUserPortfolio', portfolio)
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
  async sellStock({ commit, rootState }, sellStockTransaction: newStockTransaction) {
    // * No way to typecast multiple variables 
    let portfolio: UserPortfolio = state.portfolio;
    console.log(portfolio.ownedStocks[sellStockTransaction.symbol].amountOwned)
    if (
      portfolio.ownedStocks[sellStockTransaction.symbol].amountOwned >= 2
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
                portfolioWorth: portfolio.portfolioWorth - sellStockTransaction.data.priceAtTransaction
              },
              { merge: true }
            );
          await firebaseData
            .firestore()
            .collection("portfolios")
            .doc(state.uid)
            .get()
            .then((doc: doc) => {
              if (doc.exists) {
                portfolio = doc.data()
              } else {
                console.log('bruh')
              }
            }).catch((error) => {
              console.error(error)
            })
          console.log(portfolio)
          commit("setUserPortfolio", portfolio);
        }
      });
    }
    // ? Maybe make it 1 
    else {
      await firebaseData
        .firestore()
        .collection("portfolios")
        .doc(state.uid)
        .set(
          {
            ownedStocks:
            {
              [sellStockTransaction.symbol]: firebase.firestore.FieldValue.delete()
            }
          },
          { merge: true }
        )
      await firebaseData
        .firestore()
        .collection("portfolios")
        .doc(state.uid)
        .get()
        .then((doc: doc) => {
          if (doc.exists) {
            portfolio = doc.data()
          } else {
            console.log('bruh')
          }
        }).catch((error) => {
          console.error(error)
        })
      commit("setUserPortfolio", portfolio);
      console.log("Delete")
    }
  }
  // Todo: Create a little message popup (that doesn't interupt UX) for either insufficient funds to not stocks to sell
}

interface State {
  funds: number;
  portfolio: UserPortfolio;
  userPortfolios: Object;
  uid: string;
}

export interface UserPortfolio {
  availableFunds: number;
  name?: string;
  ownedStocks: firebaseStockTransaction;
  portfolioWorth: number;
  photoURL?: string
}

export interface firebaseStockTransaction {
  [symbol: string]: {
    symbol: string;
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
