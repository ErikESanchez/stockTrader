import {
  FirebaseStockInfo,
  FirebaseStockTransactions,
  newStockTransaction,
  PortfolioChange,
  UserPortfolio,
} from "./global.interface";

export function buyTransactionUpdate(
  localPortfolio: UserPortfolio,
  stockTransaction: newStockTransaction
): PortfolioChange {
  let symbol: string = stockTransaction.symbol;
  let portfolioChanges: PortfolioChange;
  let updatedFunds: number = localPortfolio.funds - stockTransaction.priceAtTransaction
  if (localPortfolio.ownedStocks[symbol]) {
    let newAmountOfOwned: number =
      localPortfolio.ownedStocks[symbol].owned + stockTransaction.amount;
    portfolioChanges = {
      ownedStocks: {
        [symbol]: {
          owned: newAmountOfOwned,
        },
      },
      funds: updatedFunds
    }
    return portfolioChanges;
  } else {
    portfolioChanges = {
      ownedStocks: {
        [symbol]: {
          owned: stockTransaction.amount,
        },
      },
      funds: updatedFunds
    }
    return portfolioChanges;
  }
}

export function sellTransactionUpdate(
  localPortfolio: UserPortfolio,
  sellStockTransaction: newStockTransaction
): PortfolioChange {
  let symbol: string = sellStockTransaction.symbol;
  let portfolioChanges: PortfolioChange = {
    funds: localPortfolio.funds + sellStockTransaction.amount,
    ownedStocks: {
      [symbol]: {
        owned: localPortfolio.ownedStocks[symbol].owned + sellStockTransaction.amount
      }
    }
  };
  return portfolioChanges
}

