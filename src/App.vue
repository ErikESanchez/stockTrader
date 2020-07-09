<template>
  <div id="app">
    <navbar></navbar>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

// Todo: add a footer if you want
import Navbar from "./components/Navbar.vue";
import { Portfolio } from "@/Classes/Portfolio";
import { Account } from "@/Classes/Account";
import { firebaseData } from "@/firebase";
import axios from "axios";
import store from "@/store";
import moment from "moment";
interface SuccessfulDataRequest {
  "Meta Data": {
    "1. Information": string;
    "2. Symbol": string;
    "3. Last Refreshed": string;
    "4. Output Size": string;
    "5. Time Zone": string;
  };
  "Time Series (Daily)": Array<TIME_SERIES>;
}

interface TIME_SERIES {
  "1. open": string;
  "2. high": String;
  "3. low": String;
  "4. close": String;
  "5. volume": String;
}

interface TIME_SERIES_DAILY_REQUEST {
  function: "TIME_SERIES_DAILY";
  symbol: string;
  apikey: "GS49HW5R2JZ7HQYO";
}
const marketDataUrl: string = "https://www.alphavantage.co/query";
const dateFormat = "YYYY-MM-DD";

export default Vue.extend({
  name: "App",
  components: {
    Navbar
  },
  data() {
    return {
      signedIn: false,
      dataLoaded: false
    };
  },
  async created() {
    await firebaseData.auth().onAuthStateChanged(async user => {
      if (user) {
        // Todo: If user has stock(s), put them into the parameters
        // let portfolio: Portfolio = new Portfolio(user.uid);
        let account: Account = new Account(user);
        store.commit("userModule/setAccount", account as Account);
        store.dispatch("portfolio/getPortfolio", user.uid);
        // store.commit("portfolio/setPortfolioClass", portfolio as Portfolio);
        this.signedIn = true as boolean;
        this.dataLoaded = true;
      } else {
        let account: Account = new Account();
        store.commit("userModule/setAccount", account as Account);
        // store.commit("changedSignedInStatus", false);
        console.log("$$$ Sign Up to get some dolla dolla bills yall $$$");
        this.dataLoaded = true as boolean;
      }
    });
  },
  async mounted() {
    function getMissingDaysList(lastDaySaved: string): Array<string> {
      let missingDays: number = moment().diff(lastDaySaved, "days");
      let counter: number = 1;
      let missingDaysList: Array<string> = [];
      while (counter < missingDays) {
        let date = moment(lastDaySaved).add(counter, "day");
        if (date.isoWeekday() !== 6 && date.isoWeekday() !== 7)
          missingDaysList.push(date.format(dateFormat));
        counter++;
      }
      return missingDaysList;
    }
    const testPayload: TIME_SERIES_DAILY_REQUEST = {
      function: "TIME_SERIES_DAILY",
      symbol: "AMZN",
      apikey: "GS49HW5R2JZ7HQYO"
    };
    // function that returns the last day that was saved in db
    let lastDay: string = "2020-06-01";
    let missingDays: Array<string> = getMissingDaysList(lastDay);
    async function getStockQuote(quoteRequest: TIME_SERIES_DAILY_REQUEST) {
      return await axios.get(marketDataUrl, {
        params: quoteRequest
      });
    }
    function removeUWUwantedDays(neededDays: Array<string>, totalList: any) {
      let formatedList: any = {};
      for (let date in totalList) {
        if (neededDays.includes(date)) formatedList[date] = totalList[date];
      }
      return formatedList;
    }

    await getStockQuote(testPayload)
      .then(res => {
        let formatedData: SuccessfulDataRequest = res.data;
        console.log(formatedData);
        console.log(formatedData["Time Series (Daily)"]);
        let dataToPutInDB = removeUWUwantedDays(
          missingDays,
          formatedData["Time Series (Daily)"]
        );
      })
      .catch(err => {
        console.error(err);
      });
  }
});
</script>

<style lang="scss">
@import "~bootstrap/scss/bootstrap";
</style>
