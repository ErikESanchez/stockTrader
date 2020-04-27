import { ActionTree } from "vuex";
import { GetterTree } from "vuex";
import { MutationTree } from "vuex";
import { Portfolio, newStockTransaction } from "@/Classes/Portfolio";
import { firebaseData } from "@/firebase";

const state = {
  myPortfolio: Portfolio,
  myPortfolioId: String,
  portfolios: Array<Portfolio>(), // includes all portfolios except mine
};
const getters: GetterTree<any, any> = {
  getAllMyStocks: (state) => {
    let myPortfolio: Portfolio = state.portfolios.find(
      (portfolio: Portfolio) => portfolio.getPortfolioId() === state.myPortfolioId
    );
    return myPortfolio.getCurrentlyOwnedStocks();
  },
  getMyPortfolio: (state) => {
    return state.myPortfolio;
  },
  getMyPortfolioId: (state) => {
    return state.myPortfolioId;
  },
  getAvaibleFunds: (state) => {
    return state.myPortfolio.getAvaibleFunds();
  },
};
const mutations: MutationTree<any> = {
  updateMyId(state, newId: string) {
    state.myPortfolioId = newId;
  },
  addMyPortfolio(state, myPortfolioData: Portfolio) {
    state.myPortfolio = myPortfolioData;
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

export const portfolioConverter = {
  fromFbPortfolioData(id: string, firebaseData: any): newPortfolioData {
    let formatedData: newPortfolioData = {
      id,
      name: firebaseData.name,
      ownedStocks: firebaseData.ownedStocks,
      portfolioWorth: firebaseData.portfolioWorth,
      avaibleFunds: firebaseData.avaibleFunds,
    };
    return formatedData;
  },
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
    addMyPortfolio: "addMyPortfolio",
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
