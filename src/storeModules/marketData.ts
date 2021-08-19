import Vue from "vue";
import { ActionTree, GetterTree, MutationTree } from "vuex";
import { firebaseData } from "../firebase";
import moment from "moment";

const state: State = {
  monthStockData: [],
  stocks: [],
  formatedStocks: [],
  lastRefreshed: String(),
  allStockData: Object(),
};

const getters: GetterTree<any, any> = {
  formatedStocks: (state) => {
    return state.formatedStocks;
  },
  getMonthData: (state) => {
    return state.monthStockData;
  },
  getLastRefreshed: (state) => {
    console.log(state.lastRefreshed);
    return state.lastRefreshed;
  },
  allStockData: (state) => {
    return state.allStockData;
  },
};

const mutations: MutationTree<any> = {
  setAllStockData(state: State, allStocks: MonthData) {
    state.allStockData = allStocks;
  },
  addDataToStock(state, newStock) {
    state.stocks.push(newStock);
  },
  formatMonthData(state: State, symbol: string) {
    let newMonthObject: MonthData = {};
    console.log(symbol);

    // console.log(state.allStockData);

    // if (monthPayload.priceData[orderedDates] !== undefined) {
    //   newMonthObject[orderedDates] = monthPayload.priceData[orderedDates];
    // }
    // state.monthStockData = newMonthObject;
  },
  formatDatabaseData(state, stockPayload: StockData) {
    state.formatedStocks = [];
    Object.keys(stockPayload).forEach((symbol: string) => {
      let mostRecentTradingDay: string =
        stockPayload[symbol]["Meta Data"]["3. Last Refreshed"];
      let metaData: MetaData = stockPayload[symbol]["Meta Data"];
      let priceData: TimeSeriesData =
        stockPayload[symbol]["Time Series(Daily)"][mostRecentTradingDay];
      let formatedLocalData: stockDataFormat = {
        stockData: {
          name: symbol,
          open: Number(priceData["1. open"]),
          high: Number(priceData["2. high"]),
          low: Number(priceData["3. low"]),
          close: Number(priceData["4. close"]),
          volume: Number(priceData["5. volume"]),
          lastRefreshed: metaData["3. Last Refreshed"],
        },
      };
      state.formatedStocks.push(formatedLocalData);
    });
  },
};

export const actions: ActionTree<any, any> = {
  async getMonthData({ state, getters }, symbol: string) {
    return getters.allStockData[symbol];
  },
  async getDatabaseDailyData({ commit }) {
    // TODO: Figure out how to use an interface and to be able dynamically name a variable
    let stockData: StockData = Object();
    await firebaseData
      .firestore()
      .collection("stocks")
      .get()
      .then(function(querySnapshot: any) {
        querySnapshot.forEach(
          (TimeSeriesDailyResponse: TimeSeriesDailyResponse) => {
            if (TimeSeriesDailyResponse.data()) {
              let TimeSeriesDaily: TimeSeriesDaily = TimeSeriesDailyResponse.data();
              let symbol: string =
                TimeSeriesDaily["Meta Data(Daily)"]["2. Symbol"];
              stockData[symbol] = {
                ["Meta Data"]: TimeSeriesDaily["Meta Data(Daily)"],
                ["Time Series(Daily)"]: {},
              };
              return stockData;
            } else {
              return undefined;
            }
          }
        );
      })
      .catch(function(error: any) {
        console.error("Error getting documents", error);
      });
    let currentMonth: string = moment(new Date()).format("YYYY-MM");
    let lastMonth: string = moment(
      new Date().setMonth(new Date().getMonth() - 1)
    ).format("YYYY-MM");
    Object.keys(stockData).forEach(
      async (symbol: string, index: number, symbolArray: Array<string>) => {
        await firebaseData
          .firestore()
          .collection("stocks")
          .doc(symbol)
          .collection("Time Series(Daily)")
          .doc(currentMonth)
          .get()
          .then((TimeSeriesDailyData) => {
            if (TimeSeriesDailyData.data() as TimeSeriesDailyDataResponse) {
              let TimeSeriesDaily: TimeSeriesDailyData = TimeSeriesDailyData.data() as TimeSeriesDailyData;
              stockData[symbol]["Time Series(Daily)"] = TimeSeriesDaily;
            } else {
              console.log("This document doesn't exist");
            }
          })
          .catch(function(error: any) {
            console.error("Error getting document:", error);
          });
        // if (symbolArray.length === index + 1) {
        //   commit("setAllStockData", stockData);
        //   commit("formatDatabaseData", stockData);
        // }
      }
    );
    if (Object.keys(stockData["AAPL"]["Time Series(Daily)"]).length < 30) {
      Object.keys(stockData).forEach(
        async (symbol: string, index: number, symbolArray: Array<string>) => {
          await firebaseData
            .firestore()
            .collection("stocks")
            .doc(symbol)
            .collection("Time Series(Daily)")
            .doc(lastMonth)
            .get()
            .then((TimeSeriesDailyData) => {
              if (TimeSeriesDailyData.data() as TimeSeriesDailyData) {
                let TimeSeriesDailyPreviousMonth: TimeSeriesDailyData = TimeSeriesDailyData.data() as TimeSeriesDailyData;
                stockData[symbol]["Time Series(Daily)"] = Object.assign(
                  TimeSeriesDailyPreviousMonth,
                  stockData[symbol]["Time Series(Daily)"]
                );
              } else {
                console.log("This document doesn't exist");
              }
            });
          if (symbolArray.length === index + 1) {
            commit("setAllStockData", stockData);
            commit("formatDatabaseData", stockData);
          }
        }
      );
    }
  },
};

interface TimeSeriesDailyResponse {
  data(): TimeSeriesDaily;
  id: string;
}

interface TimeSeriesDailyDataResponse {
  data(): TimeSeriesDailyData;
}

export interface TimeSeriesDaily {
  "Meta Data(Daily)": MetaData;
  "Time Series(Daily)": TimeSeriesDailyData;
}

export interface MetaData {
  "1. Information": string;
  "2. Symbol": string;
  "3. Last Refreshed": string;
  "4. Output Size": string;
  "5. Time Zone": string;
}

export interface TimeSeriesDailyData {
  [day: string]: TimeSeriesData;
}

export interface TimeSeriesData {
  "1. open": string;
  "2. high": string;
  "3. low": string;
  "4. close": string;
  "5. volume": string;
}

export interface MonthData {
  [date: string]: any;
}
interface StockData {
  [symbol: string]: {
    "Meta Data": MetaData;
    "Time Series(Daily)": TimeSeriesDailyData;
  };
}

export interface TIME_SERIES {
  function: string;
  symbol: string;
  interval: string;
  apikey: string;
  outputsize?: string;
}

export interface stockDataFormat {
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

interface State {
  monthStockData: [];
  stocks: [];
  formatedStocks: [];
  lastRefreshed: string;
  allStockData: {};
}

export default {
  namespaced: true,
  actions,
  mutations,
  getters,
  state,
};
