import { ActionTree, GetterTree, MutationTree } from "vuex";
import moment from "moment";
import {
  getFirestore,
  collection,
  getDocs,
  query,
} from "firebase/firestore/lite";
import { initializeApp } from "firebase/app";
const app = initializeApp({
  apiKey: "AIzaSyCOR6Tbv6KkHGejJVPGYiGbWM8Av4m42nk",
  authDomain: "stock-trader-fa865.firebaseapp.com",
  databaseURL: "https://stock-trader-fa865.firebaseio.com",
  projectId: "stock-trader-fa865",
  storageBucket: "stock-trader-fa865.appspot.com",
  messagingSenderId: "502197568222",
  appId: "1:502197568222:web:fdce89b9bb9cf526d8b84f",
  measurementId: "G-CGXD9V37XZ",
});
const db = getFirestore(app);

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
  formatDatabaseData(state, stockPayload: StockDataSymbol) {
    state.formatedStocks = [];
    Object.keys(stockPayload).forEach((symbol: string) => {
      let mostRecentTradingDay: string =
        stockPayload[symbol]["Meta Data"]["3. Last Refreshed"];
      let metaData: MetaData = stockPayload[symbol]["Meta Data"];
      let priceData: TimeSeriesData =
        stockPayload[symbol]["Time Series(Daily)"][mostRecentTradingDay];
      let companyOverview: CompanyOverview =
        stockPayload[symbol]["Company Overview"];
      let formatedLocalData: stockDataFormat = {
        stockData: {
          name: companyOverview["Name"],
          country: companyOverview["Country"],
          description: companyOverview["Description"],
          exchange: companyOverview["Exchange"],
          sector: companyOverview["Sector"],
          symbol: companyOverview["Symbol"],
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
  async getMonthData({ getters }, symbol: string) {
    return getters.allStockData[symbol];
  },
  async getDatabaseDailyData({ commit }) {
    // TODO: Figure out how to use an interface and to be able dynamically name a variable
    let stockData: StockDataSymbol = Object();
    let stocksCollection = collection(db, "stocks");
    let stocksSnap = await getDocs(stocksCollection);
    const stocksList = stocksSnap.docs.map((doc) => {
      doc.data();
    });
    return Promise.resolve(stocksList);
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
export interface StockDataSymbol {
  [symbol: string]: StockData;
}

export interface StockData {
  "Meta Data": MetaData;
  "Company Overview": CompanyOverview;
  "Time Series(Daily)": TimeSeriesDailyData;
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
    symbol: string;
    name: string;
    description: string;
    exchange: string;
    country: string;
    sector: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    lastRefreshed: string;
  };
}

export interface FormatedStock {
  symbol: string;
  name: string;
  description: string;
  exchange: string;
  country: string;
  sector: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  lastRefreshed: string;
}

interface CompanyDataResponse {
  data(): CompanyData;
}

interface CompanyData {
  "Company Overview": CompanyOverview;
  "Meta Data(Daily)": MetaData;
}

export interface CompanyOverview {
  Symbol: string;
  AssetType: string;
  Name: string;
  Description: string;
  CIK: string;
  Exchange: string;
  Currency: string;
  Country: string;
  Sector: string;
  Industry: string;
  Address: string;
  FiscalYearEnd: string;
  LatestQuarter: string;
  MarketCapitalization: string;
  EBITDA: string;
  PERatio: string;
  PEGRatio: string;
  BookValue: string;
  DividendPerShare: string;
  DividendYield: string;
  EPS: string;
  RevenuePerShareTTM: string;
  ProfitMargin: string;
  OperatingMarginTTM: string;
  ReturnOnAssetsTTM: string;
  ReturnOnEquityTTM: string;
  RevenueTTM: string;
  GrossProfitTTM: string;
  DilutedEPSTTM: string;
  QuarterlyEarningsGrowthYOY: string;
  QuarterlyRevenueGrowthYOY: string;
  AnalystTargetPrice: string;
  TrailingPE: string;
  ForwardPE: string;
  PriceToSalesRatioTTM: string;
  PriceToBookRatio: string;
  EVToRevenue: string;
  EVToEBITDA: string;
  Beta: string;
  "52WeekHigh": string;
  "52WeekLow": string;
  "50DayMovingAverage": string;
  "200DayMovingAverage": string;
  SharesOutstanding: string;
  SharesFloat: string;
  SharesShort: string;
  SharesShortPriorMonth: string;
  ShortRatio: string;
  ShortPercentOutstanding: string;
  ShortPercentFloat: string;
  PercentInsiders: string;
  PercentInstitutions: string;
  ForwardAnnualDividendRate: string;
  ForwardAnnualDividendYield: string;
  PayoutRatio: string;
  DividendDate: string;
  ExDividendDate: string;
  LastSplitFactor: string;
  LastSplitDate: string;
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
