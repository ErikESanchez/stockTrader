import { Stock } from "./Stock";
import { firebaseData } from "@/firebase";
import store from "@/store";
// import { newStockTransaction } from '@/store';
import axios from "axios";
import { apikey } from "../apikey";
import moment from "moment";
import portfolio from "@/storeModules/portfolio";
import { firestore } from "firebase";

// * Need to make the logic for the user stroring stocks i think,
export class Portfolio {
  name: string;
  ownedStocks: stockTransactionData | undefined;
  stocks: any;
  formatedStocks!: [];
  portfolio: portfolio | undefined;
  constructor(portfolioName: string) {
    this.name = portfolioName as string;
    // this.ownedStocks = initialStocks;
    this.stocks = Array();
    // this.portfolioWorth;
  }
  buyStock(stocks: newStockTransaction) {
    // Todo: Check if user has enough money
    if (this.portfolio) {
      this.addUserFirebaseStocks(stocks);
    } else if (this.portfolio === undefined) {
      this.setNewUserDatabasePortfolio();
      console.log("bruh");
    }
  }
  getUserFirebaseStocks() {
    firebaseData
      .firestore()
      .collection("portfolios")
      .doc(this.name as string)
      .get()
      .then((doc) => {
        // console.log(`Document Data`, doc.data());
        if (doc.data()) {
          this.portfolio = doc.data() as portfolio;
          // console.log("Owned Stocks", this.portfolio);
        } else {
          this.portfolio = undefined;
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  addUserFirebaseStocks(stocks: newStockTransaction) {
    if (this.portfolio) {
      let user: any = store.getters.getAccount.user;
      // let newOwnedStocks: any = ;
      let availableFunds: number = this.portfolio.availableFunds;
      let amountOfStocks: number = stocks.stockData.amount;
      let priceAtTransaction: number = stocks.stockData.priceAtTransaction;
      let symbol: string = stocks.stockName;
      let stockClass: Stock = new Stock(
        priceAtTransaction,
        amountOfStocks,
        symbol
      );
      let totalCost: number = stockClass.getTotalWorth();
      firebaseData
        .firestore()
        .collection("portfolios")
        .doc(this.name as string)
        .update({
          availableFunds: availableFunds - totalCost,
          name: user.displayName || user.email,
          ownedStocks: firestore.FieldValue.arrayUnion(stocks),
          portfolioWorth: totalCost,
        });
    }
  }
  setNewUserDatabasePortfolio() {
    let accountClass: any = store.getters.getAccount.user;
    firebaseData
      .firestore()
      .collection("portfolios")
      .doc(this.name as string)
      .set({
        availableFunds: 10000,
        name:
          (accountClass.displayName as string) ||
          (accountClass.email as string),
        ownedStocks: Array(),
        portfolioWorth: 0,
      })
      .then(() => {
        console.log("Document Succesfully Written");
      })
      .catch((error: any) => {
        console.error(error);
      });
  }
}

interface portfolio {
  availableFunds: number;
  name: String;
  ownedStocks: newStockTransaction;
  portfolioWorth: Number;
}
export interface TIME_SERIES_DAILY {
  function: "TIME_SERIES_DAILY";
  symbol: string;
  interval: string;
  apikey: string;
  outputsize?: string;
}

export interface newStockTransaction {
  stockName: string;
  stockData: stockTransactionData;
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
    buyMoreStock: "buyMoreStock",
  },
};
