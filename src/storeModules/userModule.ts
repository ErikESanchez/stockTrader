import Vue from "vue";
import { firebaseData } from "../firebase";
import { Account, userInput, userChanges } from "@/Classes/Account";
import { ActionTree, GetterTree, MutationTree } from "vuex";

const state = {
  user: Object(),
  userClass: Object(),
  account: Account,
};

const getters: GetterTree<any, any> = {
  getUser: (state: any) => {
    // ? Might have to change to undefined
    if (state.user == null) {
      console.log("No User Data");
    }
    return state.user;
  },
  getUserClass: (state: any) => {
    return state.userClass;
  },
  getAccount: (state: any) => {
    return state.account;
  },
};

const mutations: MutationTree<any> = {
  setUser(state: any, userData: any) {
    // console.log('userData', userData.email)
    state.user = userData;
  },
  setUserClass(state: any, userClass: Object) {
    Vue.set(state, "userClass", userClass);
  },
  setAccount(state: any, user: any) {
    Vue.set(state, "account", user);
  },
};

const actions: ActionTree<any, any> = {
  fetchUser({ commit }) {
    firebaseData.auth().onAuthStateChanged(async (user) => {
      if (user) {
        commit("setUserClass", user);
        // Todo: Get user Portfolio Data
        // If user does not have account make one, but prompt the user for one first
      } else {
        // Todo: get rid of data from portfolio
        commit("setUserClass", undefined);
        console.log("$$$ Sign Up to get some dolla dolla bills yall $$$");
      }
    });
  },
  // ? For some reasone it doesn't allow me to typecast the parameters(to string), need to figure out why

  login({ state }, userInput: userInput) {
    state.account.login(userInput);
  },
  async signOut({ state }) {
    state.account.signOut();
  },
  // ? Doesn't let me use an interface to typecasting
  createNewUser({ state }, userInput: userInput) {
    state.account.createNewUser(userInput);
  },
  saveProfileChanges({ state }, userChanges: string) {
    state.account.changeUserProfile(userChanges);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
