import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        stocks: {
            BMW_Stock: {
                name: 'BMW',
                value: 200 + '$'
            },
            Google_Stock: {
                name: 'Google',
                value: 150 + '$'
            },
            Apple_Stock: {
                name: 'Apple',
                value: 1000 + '$'
            },
            Twitter_Stock: {
                name: 'Twitter',
                value: 100 + '$'
            }
        },
        userStocks: {

        },

        funds: 10000 + '$',

    },
    getters: {
        totalFunds: state => {
            return state.funds
        },
        stockGetter: state => {
            return state.stocks
        },
        userStocksGetter: state => {
            return state.userStocks
        }
    },
    mutations: {
        generateStockvalues(state) {
            let randomNum = Math.floor((Math.random() * 100) + 1);
            state.BMW_Stock = randomNum
        },
        userBoughtStocks(state, payload) {
            state.userStocks = state
            console.log(payload)
            state.userStocks = state.stocks
            console.log(state.userStocks)
        }
    },
    actions: {}
})