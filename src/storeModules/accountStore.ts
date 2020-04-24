import { ActionTree } from "vuex";
import { GetterTree } from "vuex";
import { MutationTree } from "vuex";
import { Account } from "@/Classes/Account";
import { firebaseData } from "@/firebase";

const state = {
  signedIn: false,
  myAccount: Account,
};
const getters: GetterTree<any, any> = {
  getSignedInStatus() {
    return state.signedIn;
  },
  getMyAccont() {
    return state.myAccount;
  },
};
const mutations: MutationTree<any> = {
  changedSignedInStatus(state: any, signInStatus: boolean) {
    state.signedIn = signInStatus;
  },
  updateAccountInfo(state: any, accountData: Account) {
    state.myAccount = new Account(accountData.uid);
  },
};
export const actions: ActionTree<any, any> = {
  createAccount({ commit }, payload: newAccountCredentials) {
    return firebaseData.auth().createUserWithEmailAndPassword(payload.email, payload.password);
  },
};

export const accountStoreSchema = {
  getters: {
    getSignedInStatus: "getSignedInStatus",
    getMyAccont: "getMyAccont",
  },
  mutations: {
    changedSignedInStatus: "changedSignedInStatus",
    updateAccountInfo: "updateAccountInfo",
  },
  actions: {},
};

export interface newAccountCredentials {
  email: string;
  password: string;
}

export default {
  actions,
  mutations,
  getters,
  state,
};
