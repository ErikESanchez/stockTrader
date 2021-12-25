import {
  FirebaseStockInfo,
  FirebaseStockTransactions,
  newStockTransaction,
  UserPortfolio,
} from "./global.interface";

export function buyTransactionUpdate(
  localPortfolio: UserPortfolio,
  stockTransaction: newStockTransaction
): FirebaseStockInfo {
  let symbol: string = stockTransaction.symbol;
  let ownedStock: FirebaseStockInfo;
  if (localPortfolio.ownedStocks[symbol]) {
    let newAmountOfOwned: number =
      localPortfolio.ownedStocks[symbol].owned + stockTransaction.amount;
    ownedStock = {
      [symbol]: {
        owned: newAmountOfOwned,
      },
    };
    return ownedStock;
  } else {
    ownedStock = {
      [symbol]: {
        owned: stockTransaction.amount,
      },
    };
    return ownedStock;
  }
}

// export function sellTransactionUpdate(
//   localPortfolio: UserPortfolio,
//   sellStockTransaction: newStockTransaction
// ) {
//   console.log(sellStockTransaction);
//   let symbol: string = sellStockTransaction.symbol;
// }

