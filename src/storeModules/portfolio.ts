import { ActionTree, GetterTree, MutationTree } from "vuex";
import { auth, firestore } from "@/firebase";
import { collection, getDocs, getDoc, doc, setDoc } from "firebase/firestore";
import {
  buyTransactionUpdate,
  sellTransactionUpdate,
  // sellTransactionUpdate,
} from "@/interfaces/portfolio.interface";
import {
  FirebaseStockInfo,
  NewStockTransaction,
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
    const localUserPortfolios: Array<UserPortfolio> = [];
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
    stockTransaction: NewStockTransaction
  ) {
    const uid: string = rootGetters["userModule/user"].uid;
    const symbol: string = stockTransaction.symbol;
    let localPortfolio: UserPortfolio = getters.portfolio;
    const portfolioUserDocument = doc(firestore, `portfolios/${uid}`);
    const updatedTransactions: PortfolioChange = buyTransactionUpdate(
      localPortfolio,
      stockTransaction
    );
    await setDoc(
      portfolioUserDocument,
      {
        ownedStocks: updatedTransactions.ownedStocks,
        funds: updatedTransactions.funds,
      },
      { merge: true }
    ).then(async () => {
      localPortfolio = {
        ownedStocks: {
          [symbol]: updatedTransactions.ownedStocks[symbol],
        },
        funds: updatedTransactions.funds,
      };
      commit("setUserPortfolio", localPortfolio);
      const transactionSymbol = collection(
        firestore,
        `portfolios/${uid}/transactions/buying/${symbol}`
      );
      const transactionTimeDocument = doc(
        transactionSymbol,
        stockTransaction.time
      );
      setDoc(transactionTimeDocument, {
        priceAtTransaction: stockTransaction.priceAtTransaction,
        amount: stockTransaction.amount,
      });
    });
  },
  async sellStock(
    { commit, rootGetters, getters },
    sellStockTransaction: NewStockTransaction
  ) {
    // Todo: Make logic to remove symbol from ownedStocks or make a check for 0
    const uid: string = rootGetters["userModule/user"].uid;
    const symbol: string = sellStockTransaction.symbol;
    const localPortfolio: UserPortfolio = getters.portfolio;
    const portfolioUserDocument = doc(firestore, `portfolios/${uid}`);
    const updatedPortfolio = sellTransactionUpdate(
      localPortfolio,
      sellStockTransaction
    );
    setDoc(portfolioUserDocument, {
      funds: updatedPortfolio.funds,
      ownedStocks: {
        [symbol]: updatedPortfolio.ownedStocks[symbol],
      },
    }).then(() => {
      localPortfolio.ownedStocks[symbol] = updatedPortfolio.ownedStocks[symbol];
      commit("setUserPortfolio", localPortfolio);
      const transactionSymbol = collection(
        firestore,
        `portfolios/${uid}/transactions/selling/${symbol}`
      );
      const transactionTimeDocument = doc(
        transactionSymbol,
        sellStockTransaction.time
      );
      // ? Maybe I should make the amount positive?
      setDoc(transactionTimeDocument, {
        priceAtTransaction: sellStockTransaction.priceAtTransaction,
        amount: sellStockTransaction.amount,
      });
    });
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
