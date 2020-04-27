import Vue from 'vue'
import { firebaseData } from "../firebase"
import { ActionTree } from "vuex";
import { GetterTree } from "vuex";
import { MutationTree } from "vuex";

const state = {
    loggedIn: Boolean(),
    user: {
        displayName: String(),
        email: String()
    },
}

const getters: GetterTree<any, any> = {
    getUser: (state: any) => {
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
        state.user = {
            displayName: userData.displayName,
            email: userData.email
        }
    },
    setLogIn(state: any, userStatus: Boolean) {
        Vue.set(state, "loggedIn", userStatus)
    }

}

export const actions: ActionTree<any, any> = {
    fetchUser({ commit }) {
        firebaseData.auth().onAuthStateChanged(user => {
            if (user) {
                commit("setUser", {
                    displayName: user.displayName,
                    email: user.email
                });
                commit("setLogIn", true);
                console.log("User", user)
            } else {
                console.log("user", false)
                commit("setUser", null);
                commit("setLogIn", false);
            }
        })
    },
    signOut() {
        firebaseData
            .auth()
            .signOut()
            .then(function () {
                console.log("Signed Out");
                state.loggedIn = false
            })
            .catch(function (error) {
                console.log("Oops.. an error occurred.", error);
                state.loggedIn = true
            });
    },
}

export default {
    state,
    getters,
    actions,
    mutations
}