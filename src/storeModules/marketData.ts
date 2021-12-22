import { ActionTree, GetterTree, MutationTree } from "vuex";
import moment from "moment";
import { doc, collection, getDocs, getDoc } from "firebase/firestore";
import { firestore } from "@/firebase";

const state: State = {
  formatedStocks: [],
};

const getters: GetterTree<any, any> = {
  formatedStocks: (state) => {
    return state.formatedStocks;
  },
};

const mutations: MutationTree<any> = {
  addDataToStock(state, newStock) {
    state.stocks.push(newStock);
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
      console.log(priceData);
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
  async getDatabaseDailyData({ commit }) {
    let stockData: StockDataSymbol = {};
    const stocksSnapshotInfo = await getDocs(collection(firestore, "stocks"));
    stocksSnapshotInfo.forEach((stockInfo) => {
      if (stockInfo.data()) {
        let companyInfo = stockInfo.data() as CompanyInfo;
        let symbol: string = companyInfo["Meta Data(Daily)"]["2. Symbol"];
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
    let currentMonth: string = moment(new Date()).format("YYYY-MM");
    // let lastMonth: string = moment(
    //   new Date().setMonth(new Date().getMonth() - 1)
    // ).format("YYYY-MM");
    Object.keys(stockData).forEach(async (symbol, idx, arr) => {
      let stockSnapshotData = await getDoc(
        doc(
          collection(
            doc(collection(firestore, "stocks"), symbol),
            "Time Series(Daily)"
          ),
          currentMonth
        )
      );
      if (idx === arr.length - 1 && stockSnapshotData.exists()) {
        stockData[symbol]["Time Series(Daily)"] = stockSnapshotData.data();
        commit("formatDatabaseData", stockData);
      }
      if (stockSnapshotData.exists()) {
        stockData[symbol]["Time Series(Daily)"] = stockSnapshotData.data();
      }
    });
  },
  async getAllDBPortfolios({ commit }) {
    const querySnapshot = await getDocs(collection(firestore, "portfolios"));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
    });
  },
};

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

interface CompanyInfo {
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
  formatedStocks: [];
}

export default {
  namespaced: true,
  actions,
  mutations,
  getters,
  state,
};
