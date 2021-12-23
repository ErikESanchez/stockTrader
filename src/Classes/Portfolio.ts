import { UserPortfolio, newStockTransaction } from "@/storeModules/portfolio";

export class Portfolio {
  portfolio = Object() as UserPortfolio;
  stockTransaction = Object() as newStockTransaction;
  symbol = String()
  constructor(portfolio: UserPortfolio, stockTransaction: newStockTransaction) {
    this.portfolio = portfolio;
    this.stockTransaction = stockTransaction!;
  }
  calculateBoughtAvailableFunds(): number {
    const newFunds: number =
      this.portfolio.funds -
      this.stockTransaction.data.priceAtTransaction;
    return Number(Math.round(parseFloat(newFunds + "e" + 2)) + "e-" + 2);
  }
  calculateBoughtPortfolioWorth(): number {
    const newWorth: number =
      this.portfolio.portfolioWorth +
      this.stockTransaction.data.priceAtTransaction;
    return Number(Math.round(parseFloat(newWorth + "e" + 2)) + "e-" + 2);
  }
  calculateSoldAvailableFunds(): number {
    const newFunds: number = this.portfolio.funds;
    return Number(Math.round(parseFloat(newFunds + "e" + 2)) + "e-" + 2);
  }
}

export let storeSchema = {
  mutations: {
    buyNewStock: "buyNewStock",
    buyMoreStock: "buyMoreStock",
  },
};
