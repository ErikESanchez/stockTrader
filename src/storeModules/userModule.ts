import Vue from 'vue'
import { firebaseData } from "../firebase"
import { ActionTree } from "vuex";
import { GetterTree } from "vuex";
import { MutationTree } from "vuex";

const state = {
    loggedIn: Boolean(),
    user: {},
}

const getters: GetterTree<any, any> = {
    getUser: (state: any) => {
        // ? Might have to change to undefined
        if (state.user == null) {
            console.log("No User Data")
        }
        return state.user;
    },
    getLoggedIn: (state: any) => {
        return state.loggedIn
    },
}

const mutations: MutationTree<any> = {
    setUser(state: any, userData: any) {
        console.log('userData', userData.email)
        state.user = { email: userData.email }
    },
    setLogIn(state: any, userStatus: Boolean) {
        Vue.set(state, "loggedIn", userStatus)
    }

}

export default {
    state,
    getters,
    mutations
}