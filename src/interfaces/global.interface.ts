export interface UserPortfolio {
  funds: number;
  portfolioWorth?: number;
  name?: string;
  ownedStocks: FirebaseStockInfo;
  photoURL?: string;
}

export interface FirebaseStockInfo {
  [symbol: string]: {
    owned: number;
  };
}

export interface FirebaseStockTransactions {
    priceAtTransaction: number;
    quantity: number;
}

export interface NewStockTransaction {
  symbol: string;
  priceAtTransaction: number;
  amount: number;
  time: string;
}

export interface PortfolioChange {
  funds: number;
  ownedStocks: FirebaseStockInfo
}