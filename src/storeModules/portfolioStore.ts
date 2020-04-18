import { ActionTree } from "vuex";
import { GetterTree } from "vuex";
import { MutationTree } from "vuex";
import { Portfolio, newStockTransaction } from "@/Classes/Portfolio";

const state = {
  myPortfolioId: String,
  portfolios: Array<Portfolio>(),
};
const getters: GetterTree<any, any> = {
  getMyTotalFunds: (state) => {
    return state.funds;
  },
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
};

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
