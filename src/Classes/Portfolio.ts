import { Stock } from "./Stock";

export class Portfolio {
  name: string;
  ownedStocks: Array<Stock>;
  portfolioWorth: number;
  constructor(portfolioName: string, initialStocks: Array<Stock>) {
    this.name = portfolioName;
    this.ownedStocks = initialStocks;
    this.portfolioWorth;
  }
  //  ?Problem is what if he buys the same stock
  //   public updatePortfolioWorth(): number {
  //     let totalWorth: number = 0
  //     this.ownedStocks.forEach(stock => {
  //         totalWorth.
  //     });
  //   }
}
