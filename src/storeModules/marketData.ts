import { ActionTree, GetterTree, MutationTree } from "vuex";
import moment from "moment";
import { doc, collection, getDocs, getDoc } from "firebase/firestore";
import { firestore } from "@/firebase";
import {
  CompanyInfo,
  formattingDatabaseData,
  MonthData,
  StockDataFormat,
  StockDataSymbol,
} from "@/interfaces/market.interface";

const state: State = {
  formattedStocks: {},
  monthData: {},
};

const getters: GetterTree<any, any> = {
  formattedStocks: (state) => {
    return state.formattedStocks;
  },
  monthData: (state: State) => {
    return state.monthData
  }
};

const mutations: MutationTree<any> = {
  addDataToStock(state, newStock) {
    state.stocks.push(newStock);
  },
  formatDatabaseData(state, stockPayload: StockDataSymbol) {
    const formattedStockData = formattingDatabaseData(stockPayload);
    state.formattedStocks = formattedStockData.formattedStockData;
    state.monthData = formattedStockData.monthData;
  },
};

export const actions: ActionTree<any, any> = {
  async getDatabaseDailyData({ commit }) {
    const stockData: StockDataSymbol = {};
    const stocksSnapshotInfo = await getDocs(collection(firestore, "stocks"));
    stocksSnapshotInfo.forEach((stockInfo) => {
      if (stockInfo.data()) {
        const companyInfo = stockInfo.data() as CompanyInfo;
        const symbol: string = companyInfo["Meta Data(Daily)"]["2. Symbol"];
        stockData[symbol] = {
          ["Meta Data"]: companyInfo["Meta Data(Daily)"],
          ["Company Overview"]: companyInfo["Company Overview"],
          ["Time Series(Daily)"]: {},
        };
        return stockData;
      } else {
        return;
      }
    });
    const currentMonth: string = moment(new Date()).format("YYYY-MM");
    // let lastMonth: string = moment(
    //   new Date().setMonth(new Date().getMonth() - 1)
    // ).format("YYYY-MM");

    // ! MIGHT ERRR
    // for of loop instead
    Object.keys(stockData).forEach(async (symbol, idx, arr) => {
      const stocksCollection = collection(firestore, "stocks");
      const symbolDoc = doc(stocksCollection, symbol);
      const symbolCollectionSeries = collection(symbolDoc, "Time Series(Daily)");
      const symbolDocMonth = doc(symbolCollectionSeries, currentMonth);

      const stockSnapshotData = await getDoc(symbolDocMonth);
      if (idx === arr.length - 1 && stockSnapshotData.exists()) {
        stockData[symbol]["Time Series(Daily)"] = stockSnapshotData.data();
        commit("formatDatabaseData", stockData);
      }
      if (stockSnapshotData.exists())
        stockData[symbol]["Time Series(Daily)"] = stockSnapshotData.data();
    });
  },
};

interface State {
  formattedStocks: {
    [symbol: string]: StockDataFormat;
  };
  monthData: MonthData;
}

export default {
  namespaced: true,
  actions,
  mutations,
  getters,
  state,
};
