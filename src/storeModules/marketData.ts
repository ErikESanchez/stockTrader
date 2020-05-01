import { ActionTree } from "vuex";
import { GetterTree } from "vuex";
import { MutationTree } from "vuex";
import apikey from "../apikey"
import { db } from "../firebase"
import axios from "axios";
import * as moment from "moment"
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
    // Todo: Need to make a promise to wait for stockPayload to render!
    setTimeout(() => {
      let metaData: Object = stockPayload["metaData"];
      let priceData: Object = stockPayload["timeSeriesData"];
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
      }
      state.formatedStocks.push(formatedLocalData);
    }, 1000);
    // stockPayload.forEach(stock => {
    //   let metaData: Object = metaDataPayload["Meta Data"];
    //   let priceData: Object = stock.data["Time Series (Daily)"]["2020-04-15"];
    //   let formatedLocalData: stockDataFormat = {
    //     stockData: {
    //       name: metaData["2. Symbol"],
    //       open: Number(priceData["1. open"]),
    //       high: Number(priceData["2. high"]),
    //       low: Number(priceData["3. low"]),
    //       close: Number(priceData["4. close"]),
    //       volume: Number(priceData["5. volume"]),
    //       lastRefreshed: metaData["3. Last Refreshed"]
    //     }
    //   };
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
      let metaData: string = res.data["Meta Data"];
      let priceData: Object = res.data["Time Series (Daily)"]
      let symbol: string = metaData["2. Symbol"];
      db.collection("stocks").doc(symbol).set({
        metaData,
      }).then(function () {
        console.log("Document is under ID: ", symbol);
      }).catch(function (error) {
        console.error("Error adding document", error);
      });
      // ! Find a way to make this run the amount of months there are, can't use modulo or maybe who knows, find something
      for (let i = 1; i < 5; i++) {
        let dateOfMonth: Object = moment().subtract(i, "month");
        let formatedDateOfMonth: string = moment(dateOfMonth).format("YYYY-MM");
        let monthObject: Object = {}
        Object.keys(priceData).filter(function (str) {
          // * This returns the data of a month formated
          if (str.includes(formatedDateOfMonth) === true) {
            monthObject[str] = priceData[str];
          }
        });
        db.collection("stocks").doc(symbol).collection("Time Series").doc(formatedDateOfMonth).set({
          priceData: monthObject
        }).then(function () {
          console.log("Subdocument is under ID: ", formatedDateOfMonth)
        }).catch(function (error) {
          console.error(`Error adding subdocument`, error)
        });
      }
    });
  },

  async getDatabaseStockData({ commit }) {
    let date: Object = moment().subtract(1, "day");
    let formatedDate: string = moment(date).format("YYYY-MM-DD");
    let stockData: databaseStock = {
      metaData: Object,
      timeSeriesData: Object
    };
    db.collection("stocks").get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        console.log(doc.id, "=>", doc.data());
        stockData["metaData"] = doc.data().metaData;
      })
    }).catch(function (error) {
      console.error("Error getting documents", error)
    });
    db.collection("stocks").doc("AAPL").collection('Time Series').doc(formatedDate).get().then(function (doc) {
      if (doc.exists) {
        console.log("Document data: ", doc.data())
        stockData["timeSeriesData"] = doc.data().data;
      } else {
        console.log("Document doesn't exist");
      }
    }).catch(function (error) {
      console.error("Error getting document:", error);
    });
    commit("formatDatabaseData", stockData);

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

interface databaseStock {
  metaData: Object,
  timeSeriesData: Object
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
