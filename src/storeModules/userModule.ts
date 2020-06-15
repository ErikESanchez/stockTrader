import Vue from "vue";
import { firebaseData } from "../firebase";
import { Account, userInput, userChanges } from "@/Classes/Account";
import { ActionTree, GetterTree, MutationTree } from "vuex";

const state = {
  user: Object(),
  account: Account,
};

const getters: GetterTree<any, any> = {
  getUserClass: (state: any) => {
    return state.user;
  },
  getAccount: (state: any) => {
    return state.account;
  },
};

const mutations: MutationTree<any> = {
  setUserClass(state: any, user: Object) {
    Vue.set(state, "user", user);
  },
  setAccount(state: any, user: any) {
    Vue.set(state, "account", user);
  },
};

const actions: ActionTree<any, any> = {
  login({ state }, userInput: userInput) {
    state.account.login(userInput);
  },
  async signOut({ state }) {
    state.account.signOut();
  },
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
