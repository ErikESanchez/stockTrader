import Vue from "vue"
import { ActionTree, GetterTree, MutationTree } from "vuex";
import apikey from "../apikey"
import { db } from "../firebase"
import moment from "moment";
import axios from "axios"
// import { any } from 'async';
// import { database } from "firebase";
// import { Stock } from "@/Classes/Stock";
const marketDataUrl = "https://www.alphavantage.co/query";

const state = {
  monthStockData: [],
  stocks: Array(),
  formatedStocks: [],
  lastRefreshed: String(),
};

const getters: GetterTree<any, any> = {
  getStocks: state => {
    return state.formatedStocks;
  },
  getMonthData: state => {
    return state.monthStockData;
  },
  getLastRefreshed: state => {
    console.log(state.lastRefreshed)
    return state.lastRefreshed
  }
};

const mutations: MutationTree<any> = {
  addDataToStock(state, newStock) {
    state.stocks.push(newStock)
  },
  formatMonthData(state, monthPayload) {
    let newMonthObject: monthData = {}
    const currentMonthDates = new Array(moment("2020-04-01", "YYYY-MM-DD").daysInMonth()).fill(null).map((x, i) => moment("2020-04-01", "YYYY-MM-DD").startOf('month').add(i, 'days'));
    currentMonthDates.forEach((data, index) => {
      index;
      let orderedDates: string = data.format('YYYY-MM-DD')
      if (monthPayload.priceData[orderedDates] !== undefined) {
        newMonthObject[orderedDates] = monthPayload.priceData[orderedDates]
      }
    });
    // console.log(newMonthObject);
    state.monthStockData.push(newMonthObject)
  },
  formatDatabaseData(state, stockPayload: any) {
    // let date: Object = moment().subtract(6, "day");
    let formatedDate: string;
    let dayOfWeek: Object = moment().weekday();
    if (dayOfWeek === 6) {
      console.log("Saturday")
      let yesterday: Object = moment().subtract(1, "day")
      formatedDate = moment(yesterday).format("YYYY-MM-DD")
    } else if (dayOfWeek === 0) {
      console.log("Sunday")
      let twoDaysAgo: Object = moment().subtract(1, "day");
      formatedDate = moment(twoDaysAgo).format("YYYY-MM-DD")
    }
    // ? The functions runs fine once, but runs another four times for some reason?
    Object.keys(stockPayload).forEach((symbol) => {
      // Todo: Make interfaces for all the Objects 
      // ? Write an if statement to make sure that the data 
      console.log(stockPayload[symbol].timeSeriesData)
      if (state.isWeekend) {
        console.log("Bruh need new dates")
      } else {
        console.log("bruh, figure this out")
      }
      let metaData = stockPayload[symbol]["metaData"];
      let priceData = stockPayload[symbol]["timeSeriesData"][formatedDate];
      console.log("Price Data", priceData)
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
  async getMonthData({ commit }, symbol: string) {
    let isDone: Boolean = false
    await db.collection('stocks').doc(symbol).collection('Time Series').doc("2020-04").get().then(res => {
      if (res) {
        // snapshot.docs.map(doc => doc.data())
        // console.log(res.id, "=>", res.data());
        commit('formatMonthData', res.data());
        return isDone = true
      }
    }).catch(function (error) {
      console.error(error)
    });
    return isDone
  },
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
      let priceData: any = res.data["Time Series (Daily)"];
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
      let monthObject: any = {}
      Object.keys(priceData).filter(function (str) {
        // * This returns the data of a month formated
        if (str.includes(formatedDateOfMonth) === true) {
          console.log("str", str);
          monthObject[str] = priceData[str];
          console.log("monthObject", monthObject)
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
    let dateOfMonth: Object = moment().subtract(1, "month");
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
    await Promise.resolve(Object.keys(stockData).forEach((symbol: string, key: number, arr: any) => {
      // console.log("Symbol", symbol, key)
      return db.collection("stocks").doc(symbol).collection('Time Series').doc(formatedDateOfMonth).get().then(function (doc) {
        if (doc.exists && stockData[symbol]['timeSeriesData'] === undefined) {
          stockData[symbol]["timeSeriesData"] = doc.data()["priceData"];
          if (Object.is(arr.length - 1, key)) {
            console.log(`Last callback call at ${key} with value ${symbol}`);
            commit('formatDatabaseData', stockData);
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

interface monthData {
  [date: string]: any
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
