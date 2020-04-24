import { ActionTree } from "vuex";
import { GetterTree } from "vuex";
import { MutationTree } from "vuex";
import { Portfolio, newStockTransaction, userStock } from "@/Classes/Portfolio";
import { Stock } from "@/Classes/Stock";
import { firebaseData } from "@/firebase";

const state = {
  myPortfolioId: String,
  portfolios: Array<Portfolio>(),
};
const getters: GetterTree<any, any> = {
  getAllMyStocks: (state) => {
    let myPortfolio: Portfolio = state.portfolios.find(
      (portfolio: Portfolio) => portfolio.getPortfolioId() === state.myPortfolioId
    );
    return myPortfolio.getCurrentlyOwnedStocks();
  },
  getMyPortfolio: (state) => {
    return state.portfolios.find(
      (portfolio: Portfolio) => portfolio.getPortfolioId() === state.myPortfolioId
    );
  },
  getMyPortfolioId: (state) => {
    return state.myPortfolioId;
  },
  getAvaibleFunds: (state) => {
    let myPortfolio: Portfolio = state.portfolios.find(
      (portfolio: Portfolio) => portfolio.getPortfolioId() === state.myPortfolioId
    );
    return myPortfolio.getAvaibleFunds();
  },
};
const mutations: MutationTree<any> = {
  updateMyId(state, newId: string) {
    state.myPortfolioId = newId;
  },
  addPortfolio(state, newPortfolio: Portfolio) {
    state.portfolios.push(newPortfolio);
  },
};
const actions: ActionTree<any, any> = {
  buyStock({ commit }, payload: storeTransaction) {
    state.portfolios.forEach((portfolio: Portfolio) => {
      if (payload.portfolioId === portfolio.getPortfolioId()) portfolio.buyStock(payload.trData);
    });
  },
  sellStock({ commit }, payload: storeTransaction) {
    state.portfolios.forEach((portfolio: Portfolio) => {
      if (payload.portfolioId === portfolio.getPortfolioId()) portfolio.sellStock(payload.trData);
    });
  },
  async getMyPortfolioData({ getters, commit }, payload) {
    const myUid: string = getters.getMyAccont.uid;
    return await firebaseData
      .firestore()
      .collection("portfolios")
      .doc(myUid)
      .get();
  },
  async makePortfolioInDb({ commit }, newPortData: newPortfolioData) {
    return await firebaseData
      .firestore()
      .collection("portfolios")
      .doc(newPortData.id)
      .set({
        name: newPortData.name,
        avaibleFunds: newPortData.avaibleFunds,
        ownedStocks: newPortData.ownedStocks,
        portfolioWorth: newPortData.portfolioWorth,
      });
  },
  // updateTransactionHistoryDb({ commit }, payload) {
  //   firebaseData
  //     .firestore()
  //     .collection("portfolios")
  //     .doc(newPortData.id)
  // },
};

export interface dbOwnedStock {
  stockSymbol: string;
  amountOfShares: number;
}

export interface newPortfolioData {
  id: string;
  name: string;
  ownedStocks: Array<dbOwnedStock>;
  portfolioWorth: number;
  avaibleFunds: number;
}

export interface storeTransaction {
  portfolioId: string;
  trData: newStockTransaction;
}

export const portfolioStoreSchema = {
  getters: {
    getMyTotalFunds: "getMyTotalFunds",
    getAllMyStocks: "getAllMyStocks",
    getMyPortfolio: "getMyPortfolio",
    getMyPortfolioId: "getMyPortfolioId",
    getAvaibleFunds: "getAvaibleFunds",
  },
  mutations: {
    updateMyId: "updateMyId",
    addPortfolio: "addPortfolio",
  },
  actions: {
    buyStock: "buyStock",
    sellStock: "sellStock",
  },
};

export default {
  actions,
  mutations,
  getters,
  state,
};
