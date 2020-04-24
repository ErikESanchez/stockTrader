export class Portfolio {
  id: string; // id will be based off of uid made by firebase auth
  name: string;
  ownedStocks: Array<userStock>;
  portfolioWorth: number;
  avaibleFunds: number;
  constructor(
    id: string,
    portfolioName: string,
    avaibleFunds: number,
    initialStocks: Array<newStockTransaction>
  ) {
    this.name = portfolioName;
    this.avaibleFunds = avaibleFunds;
    this.id = id;
    this.ownedStocks = [];
    this.portfolioWorth = 0;
    initialStocks.forEach((stock: newStockTransaction) => {
      let formatednewStock: formatedTransaction = this.formatNewStock(stock);
      this.ownedStocks.push({
        name: formatednewStock.stockName,
        totalAmountShares: formatednewStock.amount,
        stockTransactionHistory: {
          stocksBought: [formatednewStock.transactionData],
          stocksSold: [],
        },
      });
    });
    this.updatePortfolioWorth();
  }

  // Mutaters
  public buyStock(newStock: newStockTransaction) {
    let formatednewStock: formatedTransaction = this.formatNewStock(newStock);
    if (this.getAvaibleFunds() > formatednewStock.amount) {
      if (this.alreadyOwnStock(newStock.stockName)) {
        this.ownedStocks.forEach((stock) => {
          if (stock.name === newStock.stockName)
            stock.stockTransactionHistory.stocksBought.push(formatednewStock.transactionData); // Todo: change how it is later
          stock.totalAmountShares += formatednewStock.amount;
        });
      } else {
        this.ownedStocks.push({
          name: formatednewStock.stockName,
          totalAmountShares: formatednewStock.amount,
          stockTransactionHistory: {
            stocksBought: [formatednewStock.transactionData],
            stocksSold: [],
          },
        });
      }
      this.updateFunds(-(formatednewStock.amount * formatednewStock.transactionData.priceAtTransaction));
      this.updatePortfolioWorth();
    } else {
      console.error("User does not have enough funds");
    }
  }

  public sellStock(stockSell: newStockTransaction) {
    let formatednewStock: formatedTransaction = this.formatNewStock(stockSell);
    let nameIdx: number = this.findNameIdx(stockSell.stockName);
    if (this.alreadyOwnStock(stockSell.stockName) && nameIdx > -1) {
      this.ownedStocks[nameIdx].totalAmountShares -= formatednewStock.amount;
      this.ownedStocks[nameIdx].stockTransactionHistory.stocksSold.push(
        formatednewStock.transactionData
      );
      this.updateFunds(stockSell.stockData.amount * stockSell.stockData.priceAtTransaction);
      this.updatePortfolioWorth();
    } else {
      console.error("Portfolio ", this.getPortfolioName(), "does not own stock", stockSell.stockName);
    }
  }

  public addFunds(amountOfFunds: number) {
    this.updateFunds(amountOfFunds);
  }

  public subtractFunds(amountOfFunds: number) {
    this.updateFunds(amountOfFunds);
  }

  // Update Functions
  private updateFunds(newAmount: number) {
    this.avaibleFunds += newAmount;
  }

  private updatePortfolioWorth() {
    let total: number = 0;
    this.ownedStocks.forEach((stock: userStock) => {
      let totalBought = 0;
      let totalSold = 0;

      stock.stockTransactionHistory.stocksBought.forEach((tr) => {
        totalBought += tr.amount * tr.priceAtTransaction;
      });

      stock.stockTransactionHistory.stocksSold.forEach((tr) => {
        totalSold += tr.amount * tr.priceAtTransaction;
      });
      total += totalBought - totalSold;
    });
    this.portfolioWorth = total;
  }

  // Function helpers
  private alreadyOwnStock(stockName: string): boolean {
    let doIOwnStock = false;
    this.ownedStocks.forEach((stock) => {
      if (stock.name === stockName && stock.totalAmountShares > 0) doIOwnStock = true;
    });
    return doIOwnStock;
  }

  private formatNewStock(newStock: newStockTransaction): formatedTransaction {
    return {
      stockName: newStock.stockName,
      amount: newStock.stockData.amount,
      transactionData: {
        priceAtTransaction: newStock.stockData.priceAtTransaction,
        amount: newStock.stockData.amount,
        time: newStock.stockData.time,
      },
    };
  }

  private findNameIdx(stockName: string) {
    let nameIdx = -1;
    this.ownedStocks.forEach((stock, stockNameIdx) => {
      if (stock.name === stockName) {
        nameIdx = stockNameIdx;
      }
    });
    return nameIdx;
  }

  // Getters
  public getAvaibleFunds(): number {
    return this.avaibleFunds;
  }

  public getPortfolioWorth(): number {
    return this.portfolioWorth;
  }

  public getPortfolioName(): string {
    return this.name;
  }

  public getPortfolioId(): string {
    return this.id;
  }

  public getCurrentlyOwnedStocks(): Array<string> {
    let totalAmount: Array<string> = [];
    this.ownedStocks.forEach((stock) => {
      if (stock.totalAmountShares > 0) totalAmount.push(stock.name);
    });
    return totalAmount;
  }

  public getStockData(stockName: string): userStock | undefined {
    if (this.alreadyOwnStock(stockName))
      return this.ownedStocks.find((stock: userStock) => stock.name === stockName);
    return undefined;
  }
}

export interface formatedTransaction {
  stockName: string;
  amount: number;
  transactionData: stockTransactionData;
}

export interface stockTransactionData {
  priceAtTransaction: number;
  amount: number;
  time: Date;
}
export interface newStockTransaction {
  stockName: string;
  stockData: stockTransactionData;
}

export interface userStock {
  name: string;
  totalAmountShares: number;
  stockTransactionHistory: stockTransactionHistory;
}

export interface stockTransactionHistory {
  stocksBought: Array<stockTransactionData>;
  stocksSold: Array<stockTransactionData>;
}
