import { firebaseData } from "@/firebase";
import store from "@/store";
// import { apikey } from "@/apikey";
import moment from "moment";

export class MarketData {
  async getDatabaseDailyData() {
    // TODO: Figure out how to use an interface and to be able dynamically name a variable
    let stockData: stockData = Object();
    let formatedDateOfMonth: string = moment(moment()).format("YYYY-MM");
    // * Bruh, this is all I had to do, to wait
    await Promise.resolve(
      firebaseData
        .firestore()
        .collection("stocks")
        .get()
        .then(function(querySnapshot) {
          querySnapshot.forEach((doc: doc) => {
            // console.log(doc.id, "=>", doc.data());
            stockData[doc.id] = {
              "metaData(Daily)": doc.data()["metaData(Daily)"],
            };
            return stockData;
          });
        })
        .catch(function(error) {
          console.error("Error getting documents", error);
        })
    );
    await Promise.resolve(
      Object.keys(stockData).forEach(
        (symbol: string, key: number, arr: any) => {
          return firebaseData
            .firestore()
            .collection("stocks")
            .doc(symbol)
            .collection("Time Series(Daily)")
            .doc(formatedDateOfMonth)
            .get()
            .then(function(doc: doc) {
              if (
                doc.exists &&
                stockData[symbol]["timeSeriesData"] === undefined
              ) {
                stockData[symbol]["timeSeriesData"] = doc.data().priceData;
                if (Object.is(arr.length - 1, key)) {
                  console.log(
                    `Last callback call at ${key} with value ${symbol}`
                  );
                  store.commit("formatDatabaseData", stockData);
                }
                // ? Might not be the best place to put this
              } else {
                console.log("Document doesn't exist");
              }
            })
            .catch(function(error) {
              console.error("Error getting document:", error);
            });
        }
      )
    );
  }
}

export interface TIME_SERIES {
  function: string;
  symbol: string;
  interval: string;
  apikey: string;
  outputsize?: string;
}

interface stockData {
  // I don't know why this works
  [metaData: string]: any;
  timeSeriesData: Object;
}

interface doc {
  [id: string]: any;
}

//  async getApiDaily({ dispatch }, stock) {
//     let payloadFormat: TIME_SERIES = {
//       function: "TIME_SERIES_DAILY",
//       symbol: stock,
//       interval: "30min",
//       apikey: apikey,
//       outputsize: "compact",
//     };
//     await dispatch("getStockQuote", payloadFormat).then((DailyData: any) => {
//       let metaData: { [key: string]: string } = DailyData.data["Meta Data"];
//       let priceData: any = DailyData.data["Time Series (Daily)"];
//       console.log(metaData);
//       let symbol: string = metaData["2. Symbol"];
//       firebaseData
//         .firestore()
//         .collection("stocks")
//         .doc(symbol)
//         .set({
//           "metaData(Daily)": metaData,
//         })
//         .catch(function(error) {
//           console.error("Error adding document", error);
//         });
//       // Todo: Make an interface for the object
//       let monthObject: any = {};
//       // ! Need to make this set files in the database by month
//       Object.keys(priceData).filter((date) => {
//         let monthDate: string = moment(date).format("YYYY-MM");
//         if (monthDate) {
//           monthObject[date] = priceData[date];
//           firebaseData
//             .firestore()
//             .collection("stocks")
//             .doc(symbol)
//             .collection("Time Series(Daily)")
//             .doc(monthDate)
//             .set({
//               priceData: monthObject,
//             })
//             .catch((error) => {
//               console.error(`Error adding subdocument`, error);
//             });
//         }
//       });
//     });
//   }
