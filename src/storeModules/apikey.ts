// import { ActionTree } from 'vuex';
import { GetterTree } from 'vuex';
import { MutationTree } from 'vuex'
import axios from "axios";


export const state = {
    apikey: "GS49HW5R2JZ7HQYO"
}

const getters: GetterTree<any, any> = {
    getApiKey() {
        return state.apikey;
    },
}

const mutations: MutationTree<any> = {
    getApiData() {
        // GET request for remote image
        axios({
            method: 'get',
            url: 'http://bit.ly/2mTM3nY',
            responseType: 'stream',
        })
            .then(function (response) {
                response.data.pipe()
            });
    }
}

export default {
    mutations,
    getters,
    state
};
