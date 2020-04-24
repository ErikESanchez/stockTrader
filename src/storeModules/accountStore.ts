import { ActionTree } from "vuex";
import { GetterTree } from "vuex";
import { MutationTree } from "vuex";

const state = {
  signedIn: false,
};
const getters: GetterTree<any, any> = {
  getSignedInStatus() {
    return state.signedIn;
  },
};
const mutations: MutationTree<any> = {
  changedSignedInStatus(state: any, signInStatus: boolean) {
    state.signedIn = signInStatus;
  },
};
export const actions: ActionTree<any, any> = {};

export const accountStoreSchema = {
  getters: {
    getSignedInStatus: "getSignedInStatus",
  },
  mutations: {
    changedSignedInStatus: "changedSignedInStatus",
  },
  actions: {},
};

export default {
  actions,
  mutations,
  getters,
  state,
};
