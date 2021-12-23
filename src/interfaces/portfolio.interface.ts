import {
  FirebaseStockInfo,
  FirebaseStockTransactions,
  newStockTransaction,
  UserPortfolio,
  stockTransactionData,
} from "./global.interface";

export function portfolioTransactionUpdate(
  localPortfolio: UserPortfolio,
  stockTransaction: newStockTransaction
  //   todo Export both updated portfolio & ownedStock or just updated portfolio ???
): UserPortfolio {
  let symbol: string = stockTransaction.symbol;
  let transactionData: stockTransactionData = stockTransaction.data;
  let transaction: FirebaseStockTransactions = {
    [transactionData.time]: {
      quantity: transactionData.amount,
      priceAtTransaction: transactionData.priceAtTransaction,
    },
  };
  let ownedStock: FirebaseStockInfo;
  if (localPortfolio.ownedStocks[symbol]) {
    let newAmountOfOwned: number =
      localPortfolio.ownedStocks[symbol].owned + transactionData.amount;
    ownedStock = {
      [symbol]: {
        owned: newAmountOfOwned,
        transactions: transaction,
      },
    };
    localPortfolio.ownedStocks = ownedStock;
    return localPortfolio;
  } else {
    ownedStock = {
      [symbol]: {
        owned: transactionData.amount,
        transactions: transaction,
      },
    };
    localPortfolio.ownedStocks = ownedStock;
    return localPortfolio;
  }
}
