import { ActionTree } from "vuex";
import { GetterTree } from "vuex";
import { MutationTree } from "vuex";
import apikey from "../apikey"
import { db } from "../firebase"
import moment from "moment";
import axios from "axios"
import { any } from 'async';
// import { database } from "firebase";
// import { Stock } from "@/Classes/Stock";
const marketDataUrl = "https://www.alphavantage.co/query";

const state = {
  testStockData: [],
  stocks: Array(),
  formatedStocks: []
};

const getters: GetterTree<any, any> = {
  getStocks: state => {
    return state.formatedStocks;
  },
  getTestData: state => {
    return state.testStockData;
  },
};

const mutations: MutationTree<any> = {
  addDataToStock(state, newStock) {
    state.stocks.push(newStock)
  },
  formatDatabaseData(state, stockPayload: any) {
    console.log("Stock Payload", stockPayload)
    // Todo: Need to make a promise to wait for stockPayload to render!
    let date: Object = moment().subtract(1, "day");
    let formatedDate: string = moment(date).format("YYYY-MM-DD");
    // ? The functions runs fine once, but runs another four times for some reason?
    Object.keys(stockPayload).forEach((symbol) => {
      console.log("symbol", symbol)
      // Todo: Make interfaces for all the Objects 
      let metaData = stockPayload[symbol]["metaData"];
      console.log("TImerSERiers", stockPayload["AAPL"]['timeSeriesData'])
      // console.log("priceData", stockPayload[symbol]["timeSeriesData"][formatedDate])
      let priceData = stockPayload[symbol]["timeSeriesData"][formatedDate];

      let formatedLocalData: stockDataFormat = {
        stockData: {
          name: symbol,
          open: Number(priceData["1. open"]),
          high: Number(priceData["2. high"]),
          low: Number(priceData["3. low"]),
          close: Number(priceData["4. close"]),
          volume: Number(priceData["5. volume"]),
          lastRefreshed: metaData["3. Last Refreshed"]
        }
      }
      state.formatedStocks.push(formatedLocalData);
    })
  },
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
      let metaData: { [key: string]: string } = res.data["Meta Data"];
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
      // let dateOfMonth: Object = moment().subtract(i, "month");
      let formatedDateOfMonth: string = moment(moment()).format("YYYY-MM");
      let monthObject: Object = {}
      Object.keys(priceData).filter(function (str) {
        // * This returns the data of a month formated
        if (str.includes(formatedDateOfMonth) === true) {
          console.log("str", str);
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
    });
  },
  async getStockQuote({ commit }, payload: TIME_SERIES_DAILY) {
    return await axios.get(marketDataUrl, {
      params: {
        function: payload.function,
        symbol: payload.symbol,
        interval: payload.interval,
        apikey: payload.apikey,
        outputsize: payload.outputsize
      }
    });
  },
  async getDatabaseStockData({ commit }) {
    // TODO: Figure out how to use an interface and to be able dynamically name a variable
    let stockData: stockData = Object();
    // let dateOfMonth: Object = moment().subtract(1, "month");
    let formatedDateOfMonth: string = moment(moment()).format("YYYY-MM");
    // * Bruh, this is all I had to do, to wait
    await Promise.resolve(db.collection("stocks").get().then(function (querySnapshot) {
      querySnapshot.forEach((doc: doc) => {
        // console.log(doc.id, "=>", doc.data());
        stockData[doc.id] = {
          metaData: doc.data().metaData,
        }
        return stockData
      })
    }).catch(function (error) {
      console.error("Error getting documents", error)
    }))
    console.log("StockData test", stockData)
    await Promise.resolve(Object.keys(stockData).forEach((symbol: string, key: number, arr: any) => {
      console.log("Symbol", symbol, key)
      return db.collection("stocks").doc(symbol).collection('Time Series').doc(formatedDateOfMonth).get().then(function (doc) {
        if (doc.exists && stockData[symbol]['timeSeriesData'] === undefined) {
          // console.log("Document data: ", doc.data())
          stockData[symbol]["timeSeriesData"] = doc.data()["priceData"];
          if (Object.is(arr.length - 1, key)) {
            console.log(`Last callback call at ${key} with value ${symbol}`);
            commit('formatDatabaseData', stockData)
          }
          // ? M ight not be the best place to put this
        } else {
          console.log("Document doesn't exist");
        }
        return stockData
      }).catch(function (error) {
        console.error("Error getting document:", error);
      });
    }))
  },
};

interface doc {
  [id: string]: any
}
interface stockData {
  // I don't know why this works
  [metaData: string]: any
  timeSeriesData: Object
}

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
