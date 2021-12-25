import { ActionTree, GetterTree, MutationTree } from "vuex";
import { auth, firestore } from "@/firebase";
import { collection, getDocs, getDoc, doc, setDoc } from "firebase/firestore";
import {
  buyTransactionUpdate, sellTransactionUpdate,
  // sellTransactionUpdate,
} from "@/interfaces/portfolio.interface";
import {
  FirebaseStockInfo,
  newStockTransaction,
  PortfolioChange,
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
  // ? Perhaps call another functions to calculate portfolio 
  // ? worth every buy or sell for other stock prices
  async buyStock(
    { commit, rootGetters, getters },
    stockTransaction: newStockTransaction
  ) {
    let uid: string = rootGetters["userModule/user"].uid;
    let symbol: string = stockTransaction.symbol;
    let localPortfolio: UserPortfolio = getters.portfolio;
    let portfolioUserDocument = doc(firestore, `portfolios/${uid}`);
    let updatedTransactions: PortfolioChange = buyTransactionUpdate(
      localPortfolio,
      stockTransaction
    );
    await setDoc(
      portfolioUserDocument,
      {
        ownedStocks: updatedTransactions.ownedStocks,
        funds: updatedTransactions.funds
      },
      { merge: true }
    ).then(async () => {
      localPortfolio.ownedStocks[symbol] = updatedTransactions.ownedStocks[symbol]
      localPortfolio.funds = updatedTransactions.funds
      commit("setUserPortfolio", localPortfolio);
      let transactionSymbol = collection(firestore, `portfolios/${uid}/transactions/buying/${symbol}`)
      let transactionTimeDocument = doc(transactionSymbol, stockTransaction.time)
      setDoc(transactionTimeDocument, {
        priceAtTransaction: stockTransaction.priceAtTransaction,
        amount: stockTransaction.amount
      })
    })
  },
  async sellStock(
    { commit, rootGetters, getters },
    sellStockTransaction: newStockTransaction
  ) {
    let uid: string = rootGetters["userModule/user"].uid;
    let symbol: string = sellStockTransaction.symbol;
    let localPortfolio: UserPortfolio = getters.portfolio;
    let portfolioUserDocument = doc(firestore, `portfolios/${uid}`);
    let updatedPortfolio = sellTransactionUpdate(
      localPortfolio,
      sellStockTransaction
    );
    setDoc(portfolioUserDocument, {
      funds: updatedPortfolio.funds,
      ownedStocks: {
        [symbol]: updatedPortfolio.ownedStocks[symbol]
      }
    }).then(() => {
      localPortfolio.ownedStocks[symbol] = updatedPortfolio.ownedStocks[symbol]
      commit('setUserPortfolio', localPortfolio);
      let transactionSymbol = collection(firestore, `portfolios/${uid}/transactions/selling/${symbol}`)
      let transactionTimeDocument = doc(transactionSymbol, sellStockTransaction.time)
      // ? Maybe I should make the amount positive?
      setDoc(transactionTimeDocument, {
        priceAtTransaction: sellStockTransaction.priceAtTransaction,
        amount: sellStockTransaction.amount
      })
    })
  },
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
