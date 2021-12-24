import {
  FirebaseStockInfo,
  FirebaseStockTransactions,
  newStockTransaction,
  UserPortfolio,
} from "./global.interface";

export function buyTransactionUpdate(
  localPortfolio: UserPortfolio,
  stockTransaction: newStockTransaction
): UserPortfolio {
  let symbol: string = stockTransaction.symbol;
  let transaction: FirebaseStockTransactions = {
    [stockTransaction.time]: {
      quantity: stockTransaction.amount,
      priceAtTransaction: stockTransaction.priceAtTransaction,
    },
  };
//   console.log(localPortfolio);
  if (localPortfolio.ownedStocks[symbol]) {
    let newAmountOfOwned: number =
      localPortfolio.ownedStocks[symbol].owned + stockTransaction.amount;
    localPortfolio.ownedStocks = {
      [symbol]: {
        owned: newAmountOfOwned,
      },
    };
    return localPortfolio;
  } else {
    localPortfolio.ownedStocks = {
      [symbol]: {
        owned: stockTransaction.amount,
      },
    };
    return localPortfolio;
  }
}

export function sellTransactionUpdate(
  localPortfolio: UserPortfolio,
  sellStockTransaction: newStockTransaction
) {
  console.log(sellStockTransaction);
  let symbol: string = sellStockTransaction.symbol;
}
