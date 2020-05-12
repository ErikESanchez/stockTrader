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
    async getApiData(stock: any) {
        let payloadFormat: TIME_SERIES_DAILY = {
            function: "TIME_SERIES_DAILY",
            symbol: stock,
            interval: "30min",
            apikey: apikey.state.apikey,
            outputsize: "compact"
        };
        await this.getStockQuote(payloadFormat).then(res => {
            let metaData: string = res.data["Meta Data"];
            let priceData: Object = res.data["Time Series (Daily)"]
            let symbol: string = metaData["2. Symbol"];
            db.collection("stocks").doc(symbol).set({
                metaData,
            }).then(function () {
                console.log("Document is under ID: ", symbol);
            }).catch(function (error) {
                console.error("Error adding document", error);
            });
            // ! Find a way to make this run the amount of months there are, can't use modulo or maybe who knows, find something
            for (let i = 1; i < 5; i++) {
                let dateOfMonth: Object = moment().subtract(i, "month");
                let formatedDateOfMonth: string = moment(dateOfMonth).format("YYYY-MM");
                let monthObject: Object = {}
                Object.keys(priceData).filter(function (str) {
                    // * This returns the data of a month formated
                    if (str.includes(formatedDateOfMonth) === true) {
                        monthObject[str] = priceData[str];
                    }
                });
                db.collection("stocks").doc(symbol).collection("Time Series").doc(formatedDateOfMonth).set({
                    priceData: monthObject
                }).then(function () {
                    console.log("Subdocument is under ID: ", formatedDateOfMonth)
                }).catch(function (error) {
                    console.error(`Error adding subdocument`, error)
                });
            }
        })
    }
    formatDatabaseData(stockPayload: any) {
        // Todo: Need to make a promise to wait for stockPayload to render!
        let date: Object = moment().subtract(15, "day");
        let formatedDate: string = moment(date).format("YYYY-MM-DD");
        console.log("stockPayload", stockPayload)
        console.log(Object.keys(stockPayload))
        // ? The functions runs fine once, but runs another four times for some reason?
        Object.keys(stockPayload).forEach((symbol) => {
            console.log("symbol", symbol)
            setTimeout(() => {
                // Todo: Make interfaces for all the Objects 
                let metaData = stockPayload[symbol]["metaData"];
                // let myMap = new Map
                // myMap.set(stockPayload[symbol]["timeSeriesData"][formatedDate], Number)
                console.log(formatedDate)
                let priceData = stockPayload[symbol]["timeSeriesData"][formatedDate];
                console.log("priceData", stockPayload[symbol]["timeSeriesData"][formatedDate])
                let formatedLocalData: stockDataFormat = {
                    stockData: {
                        name: symbol,
                        open: Number(priceData["1. open"]),
                        high: Number(priceData["2. high"]),
                        low: Number(priceData["3. low"]),
                        close: Number(priceData["4. close"]),
                        volume: Number(priceData["5. volume"]),
                        lastRefreshed: metaData["3. Last Refreshed"]
                    }
                }
                this.formatedStocks.push(formatedLocalData);
            }, 10000);
        })


    }
    async getStockQuote(payload: TIME_SERIES_DAILY) {
        this.addDataToStock(payload);
        return await axios.get(this.marketDataUrl, {
            params: {
                function: payload.function,
                symbol: payload.symbol,
                interval: payload.interval,
                apikey: payload.apikey,
                outputsize: payload.outputsize
            }
        });
    }
}

export interface TIME_SERIES_DAILY {
    function: "TIME_SERIES_DAILY";
    symbol: string;
    interval: string;
    apikey: string;
    outputsize?: string;
}

interface stockDataFormat {
    stockData: {
        name: string;
        open: number;
        high: number;
        low: number;
        close: number;
        volume: number;
        lastRefreshed: string;
    };
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

