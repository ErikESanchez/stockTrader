import Vue from "vue";
import { ActionTree, GetterTree, MutationTree } from "vuex";
import { newStockTransaction } from "@/Classes/Portfolio";
import { firebaseData } from "@/firebase";
import { firestore } from "firebase";
import { Stock } from "@/Classes/Stock";

const state: State = {
  funds: 10000,
  portfolio: Object(),
  uid: String(),
};
const getters: GetterTree<any, any> = {
  getTotalFunds: (state: State) => {
    return state.funds;
  },
  getPortfolio: (state: State) => {
    return state.portfolio;
  },
};
const mutations: MutationTree<any> = {};
const actions: ActionTree<any, any> = {
  getPortfolio({ state }, uid: string) {
    state.uid = uid;
    firebaseData
      .firestore()
      .collection("portfolios")
      .doc(uid)
      .get()
      .then((doc: doc) => {
        console.log(doc.id, "=>", doc.data());
        state.portfolio = doc.data() as UserPortfolio;
      });
  },
  buyStock({ state }, stockTransaction: newStockTransaction) {
    let stockClass: Stock = new Stock(
      stockTransaction.stockData.priceAtTransaction,
      stockTransaction.stockData.amount,
      stockTransaction.stockName
    );
    firebaseData
      .firestore()
      .collection("portfolios")
      .doc(state.uid as string)
      .update({
        availableFunds:
          state.portfolio.availableFunds - stockClass.getTotalWorth(),
        ownedStocks: firestore.FieldValue.arrayUnion(stockTransaction),
        portfolio: state.portfolio.portfolioWorth + stockClass.getTotalWorth(),
      });
  },
};

interface stockTransactionData {
  priceAtTransaction: number;
  amount: number;
  time: Date;
}

interface State {
  funds: number;
  portfolio: UserPortfolio;
  uid: string;
}
interface UserPortfolio {
  availableFunds: number;
  name: string;
  stocksOwned: Array<stockTransactionData>;
  portfolioWorth: number;
}

interface doc {
  [id: string]: any;
}

export default {
  namespaced: true,
  actions,
  mutations,
  getters,
  state,
};
