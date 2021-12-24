export interface UserPortfolio {
  funds: number;
  name?: string;
  ownedStocks: FirebaseStockInfo;
  portfolioWorth: number;
  photoURL?: string;
}

export interface FirebaseStockInfo {
  [symbol: string]: {
    owned: number;
  };
}

export interface FirebaseStockTransactions {
  [timeOfTransaction: string]: {
    priceAtTransaction: number;
    quantity: number;
  };
}

export interface newStockTransaction {
  symbol: string;
  priceAtTransaction: number;
  amount: number;
  time: string;
}
