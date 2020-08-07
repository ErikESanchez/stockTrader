import Vue from "vue";
import { ActionTree, GetterTree, MutationTree } from "vuex";
import { firebaseData } from "@/firebase";
import { Portfolio } from "@/Classes/Portfolio";

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
          // console.log(doc.id, "=>", doc.data());
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
        // console.log(portfolio);
      }
    });
  },
  async buyStock(
    { state, dispatch, rootState },
    stockTransaction: newStockTransaction
  ) {
    let portfolio: UserPortfolio = state.portfolio;
    const uid: string = rootState.userModule.user.uid;
    let portfolioClass: Portfolio = new Portfolio(portfolio, stockTransaction);
    if (portfolio.ownedStocks[`${stockTransaction.symbol}`]) {
      console.log(`You own ${stockTransaction.symbol}`);
      await firebaseData
        .firestore()
        .collection("portfolios")
        .doc(uid)
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
      dispatch("setPortfolio");
    } else if (
      portfolio.ownedStocks[`${stockTransaction.symbol}`] === undefined
    ) {
      console.log(`User does not own a ${stockTransaction.symbol} stock`);
      console.log(portfolioClass.calculateBoughtPortfolioWorth());

      await firebaseData
        .firestore()
        .collection("portfolios")
        .doc(uid as string)
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
      dispatch("setPortfolio");
    }
  },
  async sellStock({ rootState }, symbol: string) {
    let portfolio: UserPortfolio = state.portfolio;
    const uid: string = rootState.userModule.user.uid;
    await firebaseData
      .firestore()
      .collection("portfolios")
      .doc(uid)
      .update({
        availableFunds: Number(),
        ownedStocks: {},
        portfolioWorth: Number(),
      });
  },
  async getAllUsers(): Promise<Array<UserPortfolio>> {
    let userData: Array<UserPortfolio> = [];
    await firebaseData
      .firestore()
      .collection("portfolios")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // console.log(doc.id, "=>", doc.data());
          userData.push(doc.data() as UserPortfolio);
        });
      });
    return userData;
  },
};

interface State {
  funds: number;
  portfolio: UserPortfolio;
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
