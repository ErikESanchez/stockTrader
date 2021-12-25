import { ActionTree, GetterTree, MutationTree } from "vuex";
import { auth, firestore } from "@/firebase";
import { collection, getDocs, getDoc, doc, setDoc } from "firebase/firestore";
import {
  buyTransactionUpdate,
  // sellTransactionUpdate,
} from "@/interfaces/portfolio.interface";
import {
  FirebaseStockInfo,
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
    let portfolioUserDocument = doc(firestore, `portfolios/${uid}`);
    let updatedTransactions: FirebaseStockInfo = buyTransactionUpdate(
      localPortfolio,
      stockTransaction
    );
    await setDoc(
      portfolioUserDocument,
      {
        ownedStocks: updatedTransactions
      },
      { merge: true }
    ).then(async () => {
      localPortfolio.ownedStocks[symbol] = updatedTransactions[symbol]
      commit("setUserPortfolio", localPortfolio);
      let transactionSymbol = collection(firestore, `portfolios/${uid}/transactions/buying/${symbol}`)
      let transactionTimeDocument = doc(transactionSymbol, stockTransaction.time)
      setDoc(transactionTimeDocument, {
        priceAtTransaction: stockTransaction.priceAtTransaction,
        amount: stockTransaction.amount
      })
    })
  },
  // async sellStock(
  //   { commit, rootGetters, getters },
  //   sellStockTransaction: newStockTransaction
  // ) {
  //   let uid: string = rootGetters["userModule/user"].uid;
  //   let symbol: string = sellStockTransaction.symbol;
  //   let localPortfolio: UserPortfolio = getters.portfolio;
  //   let portfolioCollection = collection(firestore, "portfolios");
  //   let portfolioUserDocument = doc(portfolioCollection, uid);
  //   let updatedPortfolio = sellTransactionUpdate(
  //     localPortfolio,
  //     sellStockTransaction
  //   );
  //   updatedPortfolio;
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
