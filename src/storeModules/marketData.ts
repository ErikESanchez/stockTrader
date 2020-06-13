import Vue from "vue";
import { ActionTree, GetterTree, MutationTree } from "vuex";
import { apikey } from "../apikey";
import { db } from "../firebase";
import moment from "moment";
import axios from "axios";
import { any } from "async";
const marketDataUrl = "https://www.alphavantage.co/query";

const state = {
  monthStockData: [],
  stocks: Array(),
  formatedStocks: [],
  lastRefreshed: String(),
};

const getters: GetterTree<any, any> = {
  getStocks: (state) => {
    return state.formatedStocks;
  },
  getMonthData: (state) => {
    return state.monthStockData;
  },
  getLastRefreshed: (state) => {
    console.log(state.lastRefreshed);
    return state.lastRefreshed;
  },
};

const mutations: MutationTree<any> = {
  addDataToStock(state, newStock) {
    state.stocks.push(newStock);
  },
  formatMonthData(state, monthPayload) {
    let newMonthObject: monthData = {};
    const currentMonthDates = new Array(
      moment("2020-04-01", "YYYY-MM-DD").daysInMonth()
    )
      .fill(null)
      .map((x, i) =>
        moment("2020-04-01", "YYYY-MM-DD")
          .startOf("month")
          .add(i, "days")
      );
    currentMonthDates.forEach((data, index) => {
      index;
      let orderedDates: string = data.format("YYYY-MM-DD");
      if (monthPayload.priceData[orderedDates] !== undefined) {
        newMonthObject[orderedDates] = monthPayload.priceData[orderedDates];
      }
    });
    state.monthStockData.push(newMonthObject);
  },
  formatDatabaseData(state, stockPayload: any) {
    // ? The functions runs fine once, but runs another four times for some reason?
    Object.keys(stockPayload).forEach((symbol) => {
      // Todo: Make interfaces for all the Objects
      let dates: Array<string> = Object.getOwnPropertyNames(
        stockPayload[symbol]["timeSeriesData"]
      );
      let formatedDate: string = dates.reduce((a: string, b: string) => {
        return new Date(a) > new Date(b) ? a : b;
      });
      let metaData = stockPayload[symbol]["metaData(Daily)"];
      let priceData = stockPayload[symbol]["timeSeriesData"][formatedDate];
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
  async getMonthData({ commit }, symbol: string) {
    let monthData: any;
    await db
      .collection("stocks")
      .doc(symbol)
      .collection("Time Series(Daily)")
      .doc("2020-04")
      .get()
      .then((res) => {
        if (res) {
          commit("formatMonthData", res.data());
          monthData = res;
        }
      })
      .catch(function(error) {
        console.error(error);
      });
    return monthData;
  },
  async getApiIntraday({ dispatch }, stock) {
    let payloadFormat: TIME_SERIES = {
      function: "TIME_SERIES_INTRADAY",
      symbol: stock,
      interval: "1min",
      apikey: apikey,
      outputsize: "full",
    };
    let dayData: any;
    await dispatch("getStockQuote", payloadFormat).then((IntradayData) => {
      dayData = IntradayData;
      //   console.log("Intraday Response", IntradayData);
      //   let metaData: any = IntradayData.data["Meta Data"];
      //   let priceData: any = IntradayData.data["Time Series (1min)"];
      //   let symbol: string = metaData["2. Symbol"];
      //   // Send this to the database
      //   // db.collection("stocks").doc(symbol).update({
      //   //   "metaData(Intraday)": metaData
      //   // }).catch(err => {
      //   //   console.error("Error adding document", err)
      //   // })
      //   let timesArr: Array<string> = Object.getOwnPropertyNames(priceData);
      //   let latestDate: string = timesArr.reduce((a: string, b: string) => {
      //     return new Date(a) > new Date(b) ? a : b;
      //   });
      //   let formatedDate: string = moment(latestDate).format("YYYY-MM-DD");
      //   timesArr.forEach((res, key, arr) => {
      //     if (formatedDate) {
      //       console.log("Time");
      //     }
      //   });
      //   //  db.collection("stocks").doc(symbol).collection("Time Series(Intraday)").doc(formatedHour).set({
      //   //     priceData: hourObject
      //   //   }).catch(error => {
      //   //     console.error(error);
      //   //   })
    });
    return dayData;
  },
  async getApiDaily({ dispatch }, stock) {
    let payloadFormat: TIME_SERIES = {
      function: "TIME_SERIES_DAILY",
      symbol: stock,
      interval: "30min",
      apikey: apikey,
      outputsize: "compact",
    };
    await dispatch("getStockQuote", payloadFormat).then((DailyData) => {
      let metaData: { [key: string]: string } = DailyData.data["Meta Data"];
      let priceData: any = DailyData.data["Time Series (Daily)"];
      console.log(metaData);
      let symbol: string = metaData["2. Symbol"];
      db.collection("stocks")
        .doc(symbol)
        .set({
          "metaData(Daily)": metaData,
        })
        .catch(function(error) {
          console.error("Error adding document", error);
        });
      // Todo: Make an interface for the object
      let monthObject: any = {};
      // ! Need to make this set files in the database by month
      Object.keys(priceData).filter((date) => {
        let monthDate: string = moment(date).format("YYYY-MM");
        if (monthDate) {
          monthObject[date] = priceData[date];
          db.collection("stocks")
            .doc(symbol)
            .collection("Time Series(Daily)")
            .doc(monthDate)
            .set({
              priceData: monthObject,
            })
            .catch((error) => {
              console.error(`Error adding subdocument`, error);
            });
        }
      });
    });
  },
  async getStockQuote({ commit }, payload: TIME_SERIES) {
    return await axios.get(marketDataUrl, {
      params: {
        function: payload.function,
        symbol: payload.symbol,
        interval: payload.interval,
        apikey: payload.apikey,
        outputsize: payload.outputsize,
      },
    });
  },
  async getDatabaseDailyData({ commit }) {
    // TODO: Figure out how to use an interface and to be able dynamically name a variable
    let stockData: stockData = Object();
    let dateOfMonth: Object = moment().subtract(1, "month");
    let formatedDateOfMonth: string = moment(moment()).format("YYYY-MM");
    let isDone: Boolean;
    // * Bruh, this is all I had to do, to wait
    await Promise.resolve(
      db
        .collection("stocks")
        .get()
        .then(function(querySnapshot) {
          querySnapshot.forEach((doc: doc) => {
            // console.log(doc.id, "=>", doc.data());
            stockData[doc.id] = {
              "metaData(Daily)": doc.data()["metaData(Daily)"],
            };
            return stockData;
          });
        })
        .catch(function(error) {
          console.error("Error getting documents", error);
        })
    );
    await Promise.resolve(
      Object.keys(stockData).forEach(
        (symbol: string, key: number, arr: any) => {
          return db
            .collection("stocks")
            .doc(symbol)
            .collection("Time Series(Daily)")
            .doc(formatedDateOfMonth)
            .get()
            .then(function(doc: doc) {
              if (
                doc.exists &&
                stockData[symbol]["timeSeriesData"] === undefined
              ) {
                stockData[symbol]["timeSeriesData"] = doc.data().priceData;
                if (Object.is(arr.length - 1, key)) {
                  console.log(
                    `Last callback call at ${key} with value ${symbol}`
                  );
                  commit("formatDatabaseData", stockData);
                }
                // ? Might not be the best place to put this
              } else {
                console.log("Document doesn't exist");
              }
            })
            .catch(function(error) {
              console.error("Error getting document:", error);
            });
        }
      )
    );
  },
};

interface doc {
  [id: string]: any;
}

interface time {
  [time: string]: number;
}
interface monthData {
  [date: string]: any;
}
interface stockData {
  // I don't know why this works
  [metaData: string]: any;
  timeSeriesData: Object;
}

export interface TIME_SERIES {
  function: string;
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
  state,
};
