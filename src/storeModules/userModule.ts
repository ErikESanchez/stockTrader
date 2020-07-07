import Vue from "vue";
import { Account, userInput, userChanges } from "@/Classes/Account";
import { ActionTree, GetterTree, MutationTree } from "vuex";

const state = {
  user: Object(),
  account: Account,
  userFetched: Boolean(),
};

const getters: GetterTree<any, any> = {
  getAccount: (state: state) => {
    return state.account;
  },
};

const mutations: MutationTree<any> = {
  setAccount(state: state, user: any) {
    Vue.set(state, "account", user);
  },
};

const actions: ActionTree<any, any> = {
  login({ state }, userInput: userInput) {
    state.account.login(userInput as userInput);
  },
  async signOut({ state }) {
    state.account.signOut();
  },
  createNewUser({ state }, userInput: userInput) {
    state.account.createNewUser(userInput as userInput);
  },
  saveProfileChanges({ state }, userChanges: string) {
    state.account.changeUserProfile(userChanges as string);
  },
};

interface state {
  user: Object;
  account: Account;
  userFetched: Boolean;
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
