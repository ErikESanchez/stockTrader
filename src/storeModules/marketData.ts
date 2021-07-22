import Vue from "vue";
import { ActionTree, GetterTree, MutationTree } from "vuex";
import { firebaseData } from "../firebase";
import moment from "moment";

const state = {
  monthStockData: [],
  stocks: Array(),
  formatedStocks: [],
  lastRefreshed: String(),
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
};

const mutations: MutationTree<any> = {
  addDataToStock(state, newStock) {
    state.stocks.push(newStock);
  },
  formatMonthData(state, monthPayload) {
    let newMonthObject: MonthData = {};
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
    state.monthStockData = newMonthObject;
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
  async getMonthData({ state, commit }, symbol: string) {
    await firebaseData
      .firestore()
      .collection("stocks")
      .doc(symbol)
      .collection("Time Series(Daily)")
      .doc("2020-04")
      .get()
      .then((doc: any) => {
        if (doc) {
          commit("formatMonthData", doc.data());
          console.log(doc.data());
        }
      })
      .catch(function(error: any) {
        console.error(error);
      });
    return state.monthStockData;
  },
  // async getApiIntraday({ dispatch }, stock) {
  //   let payloadFormat: TIME_SERIES = {
  //     function: "TIME_SERIES_INTRADAY",
  //     symbol: stock,
  //     interval: "1min",
  //     apikey: apikey,
  //     outputsize: "full",
  //   };
  //   let dayData: any;
  //   await dispatch("getStockQuote", payloadFormat).then((IntradayData) => {
  //     dayData = IntradayData;
  //     //   console.log("Intraday Response", IntradayData);
  //     //   let metaData: any = IntradayData.data["Meta Data"];
  //     //   let priceData: any = IntradayData.data["Time Series (1min)"];
  //     //   let symbol: string = metaData["2. Symbol"];
  //     //   // Send this to the database
  //     //   // db.collection("stocks").doc(symbol).update({
  //     //   //   "metaData(Intraday)": metaData
  //     //   // }).catch(err => {
  //     //   //   console.error("Error adding document", err)
  //     //   // })
  //     //   let timesArr: Array<string> = Object.getOwnPropertyNames(priceData);
  //     //   let latestDate: string = timesArr.reduce((a: string, b: string) => {
  //     //     return new Date(a) > new Date(b) ? a : b;
  //     //   });
  //     //   let formatedDate: string = moment(latestDate).format("YYYY-MM-DD");
  //     //   timesArr.forEach((res, key, arr) => {
  //     //     if (formatedDate) {
  //     //       console.log("Time");
  //     //     }
  //     //   });
  //     //   //  db.collection("stocks").doc(symbol).collection("Time Series(Intraday)").doc(formatedHour).set({
  //     //   //     priceData: hourObject
  //     //   //   }).catch(error => {
  //     //   //     console.error(error);
  //     //   //   })
  //   });
  //   return dayData;
  // },
  // async getApiDaily({ dispatch }, stock) {
  //   let payloadFormat: TIME_SERIES = {
  //     function: "TIME_SERIES_DAILY",
  //     symbol: stock,
  //     interval: "30min",
  //     apikey: apikey,
  //     outputsize: "compact",
  //   };
  //   await dispatch("getStockQuote", payloadFormat).then((DailyData) => {
  //     let metaData: { [key: string]: string } = DailyData.data["Meta Data"];
  //     let priceData: any = DailyData.data["Time Series (Daily)"];
  //     console.log(metaData);
  //     let symbol: string = metaData["2. Symbol"];
  //     firebaseData
  //       .firestore()
  //       .collection("stocks")
  //       .doc(symbol)
  //       .set({
  //         "metaData(Daily)": metaData,
  //       })
  //       .catch(function(error) {
  //         console.error("Error adding document", error);
  //       });
  //     // Todo: Make an interface for the object
  //     let monthObject: any = {};
  //     // ! Need to make this set files in the database by month
  //     Object.keys(priceData).filter((date) => {
  //       let monthDate: string = moment(date).format("YYYY-MM");
  //       if (monthDate) {
  //         monthObject[date] = priceData[date];
  //         firebaseData
  //           .firestore()
  //           .collection("stocks")
  //           .doc(symbol)
  //           .collection("Time Series(Daily)")
  //           .doc(monthDate)
  //           .set({
  //             priceData: monthObject,
  //           })
  //           .catch((error) => {
  //             console.error(`Error adding subdocument`, error);
  //           });
  //       }
  //     });
  //   });
  // },

  async getDatabaseDailyData({ commit }) {
    // TODO: Figure out how to use an interface and to be able dynamically name a variable
    let stockData: StockData = Object();
    let formatedDateOfMonth: string = moment("2020-04").format("YYYY-MM");
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
    Object.keys(stockData).forEach(
      async (symbol: string, index: number, symbolArray: Array<string>) => {
        await firebaseData
          .firestore()
          .collection("stocks")
          .doc(symbol)
          .collection("Time Series(Daily)")
          .doc("2021-07")
          .get()
          .then((TimeSeriesDailyData) => {
            if (TimeSeriesDailyData.data() as TimeSeriesDailyDataResponse) {
              let TimeSeriesDaily = TimeSeriesDailyData.data() as TimeSeriesDailyData;
              stockData[symbol]["Time Series(Daily)"] = TimeSeriesDaily;
            } else {
              console.log("Document doesn't exist");
            }
          })
          .catch(function(error: any) {
            console.error("Error getting document:", error);
          });
        if (Object.is(symbolArray.length - 1, index)) {
          console.log(stockData);

          commit("formatDatabaseData", stockData);
        }
      }
    );
  },
};

interface TimeSeriesDailyResponse {
  data(): TimeSeriesDaily;
  id: string;
}

interface TimeSeriesDailyDataResponse {
  data(): TimeSeriesDailyData;
}

interface TimeSeriesDaily {
  "Meta Data(Daily)": MetaData;
  "Time Series (Daily)": TimeSeriesDailyData;
}

interface MetaData {
  "1. Information": string;
  "2. Symbol": string;
  "3. Last Refreshed": string;
  "4. Output Size": string;
  "5. Time Zone": string;
}

interface TimeSeriesDailyData {
  [day: string]: TimeSeriesData;
}

interface TimeSeriesData {
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

export default {
  namespaced: true,
  actions,
  mutations,
  getters,
  state,
};
