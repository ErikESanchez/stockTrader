import Vue from "vue";
// @ts-ignore
import { ActionTree, GetterTree, MutationTree } from "vuex";
import { firebaseData } from "@/firebase";
import router from "@/router";
import { UserPortfolio } from "./portfolio";

const state: State = {
  user: Object(),
  errorMessageForAuth: null,
};

const getters: GetterTree<any, any> = {
  user: (state: State) => {
    return state.user;
  },
};

const mutations: MutationTree<any> = {
  setUser(state: State, user: any) {
    Vue.set(state, "user", user);
  },
  setErrorMessageForAuth(state: State, errorMessageForAuth: any) {
    Vue.set(state, "errorMessageForAuth", errorMessageForAuth);
  },
};

const actions: ActionTree<any, any> = {
  async signIn({ commit }: { commit: Function }, userInput: UserInput) {
    if (userInput.username !== "" && userInput.password !== "") {
      new Promise((resolve, reject) => {
        firebaseData
          .auth()
          .signInWithEmailAndPassword(userInput.username, userInput.password)
          .then((user) => {
            commit("setUser", user);
            router.push("/");
            return resolve(resolve);
          })
          .catch(function (error: any) {
            return reject(error.message);
          });
      });
    }
  },
  async signOut({ state }: { state: State }) {
    firebaseData
      .auth()
      .signOut()
      .then(() => {
        // console.log("Signed Out");
        Vue.set(state, "user", Object());
        state.user = Object();
      })
      .catch(function (error: any) {
        // console.log("Oops... an error occured", error);
      });
  },
  async createNewUser({ commit }: { commit: Function }, userInput: UserInput) {
    if (userInput.username != "" && userInput.password != "") {
      new Promise((resolve, reject) => {
        firebaseData
          .auth()
          .createUserWithEmailAndPassword(
            userInput.username,
            userInput.password
          )
          .then(() => {
            return resolve("resolve");
          })
          .catch(function (error: any) {
            // console.error(error.code, error.message);
            return reject(error.message);
          });
      }).then(() => {
        firebaseData.auth().onAuthStateChanged(async (user: any) => {
          if (user) {
            var uid = user.uid;
            await firebaseData
              .firestore()
              .collection("portfolios")
              .doc(uid)
              .set({
                availableFunds: 10000,
                name: userInput.username,
                ownedStocks: {},
                portfolioWorth: 0,
                photoURL: "",
              });
            router.push("/");
          }
        });
        return Promise.resolve();
      });
    }
  },
  changeUserName({ state }: { state: State }, newUsername: string) {
    state.user.displayName = newUsername;
    state.user
      // @ts-ignore
      .updateProfile({
        displayName: newUsername,
      })
      .then(function () {
        // Update successful.
      })
      .catch(function (error: any) {
        console.error(error);
        // An error happened.
      });
  },
  changeUserPicture({ state }: { state: State }, userLink: string) {
    state.user.photoURL = userLink;
    state.user
      // @ts-ignore
      .updateProfile({
        photoURL: userLink,
      })
      .then(function () {
        // Update succcessful
      })
      .catch(function (error: any) {
        console.error(error);
      });
  },
};

interface State {
  user: {
    displayName: string;
    photoURL: string;
  };
  errorMessageForAuth: any;
}

export interface ScreenDimensions {
  width: number;
  height?: number;
}

export interface UserInput {
  username: string;
  password: string;
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
