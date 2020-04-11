import { Stock } from "./Stock";
export class Market {
  allStocks: Array<Stock>;
  totalStockWorth: number;
  marketOpen: boolean;

  constructor(marketData: Array<Stock>) {
    this.allStocks = marketData;
    this.totalStockWorth = 0;
    this.marketOpen = false;
  }

  public getTotalWorthOfMarket(): number {
    let total: number = 0;
    let allStocks: Array<Stock> = this.allStocks;
    allStocks.forEach(stock => {
      total += stock.getTotalWorth();
    });
    return total;
  }

  public startMarket() {
    this.marketOpen = true;
    this.totalStockWorth = this.getTotalWorthOfMarket();
  }

  public endMarket() {
    this.marketOpen = false;
  }

  public addStockToTrade(newCompany: Stock) {
    this.allStocks.push(newCompany);
  }

  public getAllStocks() {
    return this.allStocks;
  }
}
