import { stocks } from "../stockData";
// I dont like the name. I dont know what it means, add some documentation to clarify 
// Seems like most of this should just be portfolio with the functionality of trades. Just move it to portfolio
export class TradeStocks {
  allStocks: Array<userStock>;
  portfolio: {
    funds: Array<userPriceHistory>;
    latestUserFunds: Number;
    myStocks: Array<userStock>;
    historyOfTrades: Array<userStock>;
  };
  funds: Array<userPriceHistory>;
  // getters and setters should be grouped together
  constructor(newFunds?: Array<userPriceHistory>, stocks?: Array<userStock>) {
    this.funds = newFunds;
    this.portfolio.myStocks = stocks;
  }

  buyStock(transcationData: newStockTransaction) {
    if (this.ownStock(transcationData.stockName)) {
      transcationData.alreadyHaveStock = true;
      this.updateStocksBuy(transcationData);
    } else {
      this.updateStocksBuy(transcationData);
    }
  }
  updateUserFunds() {
    let userFundsData: userPriceHistory = {
      funds: 10000,
      time: new Date()
    };
    this.portfolio.funds.push(userFundsData);
    console.log(stocks);
  }
  getUserFunds() {
    return this.portfolio.funds;
  }
  getLatestUserFunds() {
    return this.portfolio.latestUserFunds;
  }
  getAllStocks() {
    return stocks;
  }
  getAllUserStocks() {
    return this.portfolio.myStocks;
  }
  // This should not be here. It should be moved to portfolio
  ownStock(stockName: string) {
    let doIOwnStock = false;
    this.portfolio.myStocks.forEach(stock => {
      if (stock.name === stockName) {
        doIOwnStock = true;
      }
    });
    return doIOwnStock;
  }

  updateStocksBuy(data: newStockTransaction) {
    let newStockPurchaseData: stockTransactionData = {
      priceAtTransaction: data.stockData.priceAtTransaction,
      amount: data.stockData.amount,
      time: data.stockData.time
    };
    if (data.alreadyHaveStock) {
      this.portfolio.myStocks.forEach(stock => {
        stock.stocksOwned.push(newStockPurchaseData);
      });
    } else {
      let newStock: userStock = {
        name: data.stockName,
        stocksOwned: [newStockPurchaseData]
      };
      this.portfolio.myStocks.push(newStock);
    }
  }
}

export interface newStockTransaction {
  stockName: string;
  stockData: stockTransactionData;
  buy: boolean; // if false it is sell
  alreadyHaveStock?: boolean;
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
    buyMoreStock: "buyMoreStock"
  }
};
