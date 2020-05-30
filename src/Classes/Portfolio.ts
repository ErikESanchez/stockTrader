import { Stock } from "./Stock";
// import { newStockTransaction } from '@/store';
import axios from "axios";
import { db } from "../firebase"
import apikey from "../apikey"
import moment from "moment";

// * Need to make the logic for the user stroring stocks i think, 
export class Portfolio {
    name: string;
    ownedStocks: Array<Stock>;
    // ? Initialize this somehow
    stocks: any;
    formatedStocks!: [];
    portfolio!: {
        funds: Array<userPriceHistory>;
        latestUserFunds: Number;
        myStocks: Array<userStock>;
        historyOfTrades: Array<userStock>;
    };
    marketDataUrl = "https://www.alphavantage.co/query";

    //   portfolioWorth: number;
    constructor(portfolioName: string, initialStocks: Array<Stock>) {
        this.name = portfolioName;
        this.ownedStocks = initialStocks;
        this.stocks = Array();
        // this.portfolioWorth;
    }
    addDataToStock(newStock: any) {
        this.stocks.push(newStock)
    }
    buyStock(transactionData: newStockTransaction) {
        if (this.ownStock(transactionData.stockName)) {
            transactionData.alreadyHaveStock = true;
            this.updateStocksBuy(transactionData);
        } else {
            this.updateStocksBuy(transactionData)
        }
    }
    ownStock(stockName: string) {
        let doIOwnStock = false;
        this.portfolio.myStocks.forEach(stock => {
            if (stock.name === stockName) {
                doIOwnStock = true;
            }
        });
        return doIOwnStock;
    }
    updateStocksBuy(data: newStockTransaction) {
        let newStockPurchaseData: stockTransactionData = {
            priceAtTransaction: data.stockData.priceAtTransaction,
            amount: data.stockData.amount,
            time: data.stockData.time
        };
        if (data.alreadyHaveStock) {
            this.portfolio.myStocks.forEach(stock => {
                stock.stocksOwned.push(newStockPurchaseData);
            });
        } else {
            let newStock: userStock = {
                name: data.stockName,
                stocksOwned: [newStockPurchaseData]
            };
            this.portfolio.myStocks.push(newStock);
        }
    }

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
    buy: boolean; // if false it is sell
    alreadyHaveStock?: boolean;
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
        buyMoreStock: "buyMoreStock"
    }
};

    // Todo: learn how to type cast functions
    // let userStocks = new Portfolio("Erik", )
    //  ?Problem is what if he buys the same stock
    //   public updatePortfolioWorth(): number {
    //     let totalWorth: number = 0
    //     this.ownedStocks.forEach(stock => {
    //         totalWorth.
    //     });
    //   }

