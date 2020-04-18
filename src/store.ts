import Vue from "vue";
import Vuex from "vuex";
import marketData from "@/storeModules/marketStore";
import portfolioData from "@/storeModules/portfolioStore";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    marketData,
    portfolioData,
  },
});

export let storeSchema = {
  mutations: {
    buyNewStock: "buyNewStock",
    buyMoreStock: "buyMoreStock",
  },
};
