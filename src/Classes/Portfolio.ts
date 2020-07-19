export class Portfolio {
  portfolio: UserPortfolio;
  constructor(portfolio: UserPortfolio) {
    this.portfolio = portfolio;
  }
}

export interface UserPortfolio {
  availableFunds: number;
  name: String;
  ownedStocks: firebaseStockTransaction;
  ownedStockData: Array<stockTransactionData>;
  portfolioWorth: number;
}
export interface TIME_SERIES_DAILY {
  function: "TIME_SERIES_DAILY";
  symbol: string;
  interval: string;
  apikey: string;
  outputsize?: string;
}

export interface firebaseStock {
  amountOwned: number;
}
export interface firebaseStockTransaction {
  [symbol: string]: {
    stockName: string;
    amountOwned: number;
  };
}

export interface newStockTransaction {
  stockName: string;
  stockData: stockTransactionData;
}
interface stockTransactionData {
  priceAtTransaction: number;
  amount: number;
  time: Date;
}

interface userStock {
  name: string;
  stocksOwned: Array<stockTransactionData>;
}

export interface userPriceHistory {
  funds: number;
  time: Date;
}

export let storeSchema = {
  mutations: {
    buyNewStock: "buyNewStock",
    buyMoreStock: "buyMoreStock",
  },
};
