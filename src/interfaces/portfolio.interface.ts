import {
  NewStockTransaction,
  PortfolioChange,
  UserPortfolio,
} from "./global.interface";

export function buyTransactionUpdate(
  localPortfolio: UserPortfolio,
  stockTransaction: NewStockTransaction
): PortfolioChange {
  const symbol: string = stockTransaction.symbol;
  let portfolioChanges: PortfolioChange;
  const updatedFunds: number =
    localPortfolio.funds - stockTransaction.priceAtTransaction;
  if (
    localPortfolio.ownedStocks == undefined ||
    localPortfolio.ownedStocks[symbol] == undefined
  ) {
    console.log("Undefined symbol");
    portfolioChanges = {
      ownedStocks: {
        [symbol]: {
          owned: stockTransaction.amount,
        },
      },
      funds: updatedFunds,
    };
    return portfolioChanges;
  } else {
    const newAmountOfOwned: number =
      localPortfolio.ownedStocks[symbol].owned + stockTransaction.amount;
    portfolioChanges = {
      ownedStocks: {
        [symbol]: {
          owned: newAmountOfOwned,
        },
      },
      funds: updatedFunds,
    };
    return portfolioChanges;
  }
}

export function sellTransactionUpdate(
  localPortfolio: UserPortfolio,
  sellStockTransaction: NewStockTransaction
): PortfolioChange {
  const symbol: string = sellStockTransaction.symbol;
  const portfolioChanges: PortfolioChange = localPortfolio;
  portfolioChanges.funds = portfolioChanges.funds + sellStockTransaction.priceAtTransaction;
  portfolioChanges.ownedStocks[symbol].owned =
    localPortfolio.ownedStocks[symbol].owned + sellStockTransaction.amount;
  return portfolioChanges;
}
