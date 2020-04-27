import { ActionTree } from "vuex";
import { GetterTree } from "vuex";
import { MutationTree } from "vuex";
import apikey from "../apikey"
import { db } from "../firebase"
import axios from "axios";
// import { Stock } from "@/Classes/Stock";
const marketDataUrl = "https://www.alphavantage.co/query";

const state = {
  testStockData: [],
  stocks: Array(),
  formatedStocks: Array()
};

const getters: GetterTree<any, any> = {
  getStocks: state => {
    return state.stocks;
  }
};

const mutations: MutationTree<any> = {
  addDataToStock(state, newStock) {
    state.stocks.push(newStock)
  },
  formatDatabaseData(state, stockPayload) {
    stockPayload.forEach(stock => {
      let metaData: Object = stock.data["Meta Data"];
      let priceData: Object = stock.data["Time Series (Daily)"]["2020-04-15"];
      let formatedLocalData: stockDataFormat = {
        stockData: {
          name: metaData["2. Symbol"],
          open: Number(priceData["1. open"]),
          high: Number(priceData["2. high"]),
          low: Number(priceData["3. low"]),
          close: Number(priceData["4. close"]),
          volume: Number(priceData["5. volume"]),
          lastRefreshed: metaData["3. Last Refreshed"]
        }
      };
      state.formatedStocks.push(formatedLocalData);
    });
  }
};

export const actions: ActionTree<any, any> = {
  async getApiData({ dispatch }, stock) {
    let payloadFormat: TIME_SERIES_DAILY = {
      function: "TIME_SERIES_DAILY",
      symbol: stock,
      interval: "30min",
      apikey: apikey.state.apikey,
      outputsize: "compact"
    };
    await dispatch("getStockQuote", payloadFormat).then(res => {
      let symbol: string = res.data["Meta Data"]["2. Symbol"]
      db.collection("stocks").doc(symbol).set({
        data: res.data
      }).then(function (symbol) {
        console.log("Document is under ID: ", symbol);
      }).catch(function (error) {
        console.error("Error adding document", error);
      })
    })
  },

  async getDatabaseStockData({ commit }) {
    db.collection("stocks").get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        console.log(doc.id, "=>", doc.data());
        let array: Array<Object> = [doc.data()];
        commit("formatDatabaseData", array)
      })
    }).catch(function (error) {
      console.error("Error getting documents", error)
    });
  },

  async getStockQuote({ commit }, payload: TIME_SERIES_DAILY) {
    commit("addDataToStock", payload);
    return await axios.get(marketDataUrl, {
      params: {
        function: payload.function,
        symbol: payload.symbol,
        interval: payload.interval,
        apikey: payload.apikey,
        outputsize: payload.outputsize
      }
    });
  }
};

export interface TIME_SERIES_DAILY {
  function: "TIME_SERIES_DAILY";
  symbol: string;
  interval: string;
  apikey: string;
  outputsize?: string;
}

interface stockDataFormat {
  stockData: {
    name: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    lastRefreshed: string;
  };
}

export default {
  actions,
  mutations,
  getters,
  state
};
