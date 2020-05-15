import { ActionTree } from "vuex";
import { GetterTree } from "vuex";
import { MutationTree } from "vuex";
import apikey from "../apikey"
import { db } from "../firebase"
import moment from "moment";
// import { database } from "firebase";
// import { Stock } from "@/Classes/Stock";
const marketDataUrl = "https://www.alphavantage.co/query";

const state = {
  testStockData: [],
  stocks: Array(),
};

const getters: GetterTree<any, any> = {
  getStocks: (state) => {
    return state.formatedStocks;
  },
  getTestData: (state) => {
    return state.testStockData;
  },
};

const mutations: MutationTree<any> = {
  addDataToStock(state, newStock) {
    state.stocks.push(newStock);
  },
  formatMonthData(state, monthPayload) {
    let newMonthObject: Object = {};
    const currentMonthDates = new Array(moment("2020-04-01", "YYYY-MM-DD").daysInMonth())
      .fill(null)
      .map((x, i) =>
        moment("2020-04-01", "YYYY-MM-DD")
          .startOf("month")
          .add(i, "days")
      );
    currentMonthDates.forEach((data, index) => {
      index;
      let orderedDates = data.format("YYYY-MM-DD");
      if (monthPayload.priceData[orderedDates] !== undefined) {
        newMonthObject[orderedDates] = monthPayload.priceData[orderedDates];
      }
    });
    console.log(newMonthObject);
    state.testStockData.push(newMonthObject);
  },
};

export const actions: ActionTree<any, any> = {
  async getApiData({ dispatch }, stock) {
    let payloadFormat: TIME_SERIES_DAILY = {
      function: "TIME_SERIES_DAILY",
      symbol: stock,
      interval: "30min",
      apikey: apikey.state.apikey,
      outputsize: "compact",
    };
    await dispatch("getStockQuote", payloadFormat).then((res) => {
      let metaData: string = res.data["Meta Data"];
      let priceData: Object = res.data["Time Series (Daily)"];
      let symbol: string = metaData["2. Symbol"];
      db.collection("stocks")
        .doc(symbol)
        .set({
          metaData,
        })
        .then(function() {
          console.log("Document is under ID: ", symbol);
        })
        .catch(function(error) {
          console.error("Error adding document", error);
        });
      // ! Find a way to make this run the amount of months there are, can't use modulo or maybe who knows, find something
      for (let i = 1; i < 5; i++) {
        let dateOfMonth: Object = moment().subtract(i, "month");
        let formatedDateOfMonth: string = moment(dateOfMonth).format("YYYY-MM");
        let monthObject: Object = {};
        Object.keys(priceData).filter(function(str) {
          // * This returns the data of a month formated
          if (str.includes(formatedDateOfMonth) === true) {
            monthObject[str] = priceData[str];
          }
        });
        db.collection("stocks")
          .doc(symbol)
          .collection("Time Series")
          .doc(formatedDateOfMonth)
          .set({
            priceData: monthObject,
          })
          .then(function() {
            console.log("Subdocument is under ID: ", formatedDateOfMonth);
          })
          .catch(function(error) {
            console.error(`Error adding subdocument`, error);
          });
      }
    });
  },

  async getDatabaseStockData({ commit }) {
    let stockData: Object = {};
    let dateOfMonth: Object = moment().subtract(1, "month");
    let formatedDateOfMonth: string = moment(dateOfMonth).format("YYYY-MM");
    db.collection("stocks")
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          // console.log(doc.id, "=>", doc.data());
          stockData[doc.id] = {
            metaData: doc.data().metaData,
          };
          // stockData["metaData"] = doc.data().metaData;
        });
      })
      .catch(function(error) {
        console.error("Error getting documents", error);
      });
    setTimeout(() => {
      Object.keys(stockData).forEach((symbol: string, index: Number) => {
        console.log(symbol, index);
        db.collection("stocks")
          .doc(symbol)
          .collection("Time Series")
          .doc(formatedDateOfMonth)
          .get()
          .then(function(doc) {
            if (doc.exists && stockData[symbol]["timeSeriesData"] === undefined) {
              // console.log("Document data: ", doc.data())
              stockData[symbol]["timeSeriesData"] = doc.data()["priceData"];
              // ? M ight not be the best place to put this
            } else {
              console.log("Document doesn't exist");
            }
          })
          .catch(function(error) {
            console.error("Error getting document:", error);
          });
      });
      commit("formatDatabaseData", stockData);
    }, 1000);
  },

  async getMonthData({ commit }, symbol: string) {
    await db
      .collection("stocks")
      .doc(symbol)
      .collection("Time Series")
      .doc("2020-04")
      .get()
      .then((res) => {
        if (res) {
          // snapshot.docs.map(doc => doc.data())
          console.log(res.id, "=>", res.data());
          commit("formatMonthData", res.data());
        }
      })
      .catch(function(error) {
        console.error(error);
      });
  },


};


// interface databaseStock {
//   metaData: Object,
//   timeSeriesData: Object
// }



export default {
  actions,
  mutations,
  getters,
  state,
};
