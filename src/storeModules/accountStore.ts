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
};
export const actions: ActionTree<any, any> = {
  createAccount({ commit }, payload: newAccountCredentials) {
    return firebaseData.auth().createUserWithEmailAndPassword(payload.email, payload.password);
  },
};

export const accountStoreSchema = {
  getters: {
    getSignedInStatus: "getSignedInStatus",
  },
  mutations: {
    changedSignedInStatus: "changedSignedInStatus",
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
