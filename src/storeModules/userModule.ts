import Vue from "vue";
import { ActionTree, GetterTree, MutationTree } from "vuex";
import { firebaseData } from "@/firebase";
import router from '@/router'
import { UserPortfolio } from "./portfolio";

const state: State = {
  user: Object(),
  errorMessageForAuth: null,
};

const getters: GetterTree<any, any> = {
  user: (state: State) => {
    return state.user;
  },
  getErrorMessageForAuth: (state: State) => {
    return state.errorMessageForAuth
  }
};

const mutations: MutationTree<any> = {
  setUser(state: State, user: any) {
    Vue.set(state, "user", user);
  },
  setErrorMessageForAuth(state: State, errorMessageForAuth: any) {
    Vue.set(state, "errorMessageForAuth", errorMessageForAuth)
  }
};

const actions: ActionTree<any, any> = {
  async signIn({ commit }, userInput: UserInput) {

    if (userInput.username !== "" && userInput.password !== "") {
      let successful: boolean;
      let signInCall: any = await firebaseData
        .auth()
        .signInWithEmailAndPassword(userInput.username, userInput.password).then((user) => {
          commit("setUser", user)
          router.push("/");
          successful = true
          return successful

        })
        .catch(function (error: any) {
          commit('setErrorMessageForAuth', error.message)
          successful = false
          return signInCall

        });
      return signInCall
    }
  },
  async signOut({ state }) {
    firebaseData
      .auth()
      .signOut()
      .then(() => {
        console.log("Signed Out");
        state.user = Object();
      })
      .catch(function (error: any) {
        console.log("Oops... an error occured", error);
      });
  },
  async createNewUser({ commit }, userInput: UserInput) {
    if (userInput.username != "" && userInput.password != "") {
      let successful: boolean;
      let signUpCall = firebaseData
        .auth()
        .createUserWithEmailAndPassword(userInput.username, userInput.password)
        .catch(function (error: any) {
          successful = false
          commit('setErrorMessageForAuth', error.message)
          console.error(error.code, error.message);
        });
      firebaseData.auth().onAuthStateChanged(async (user: any) => {
        if (user) {
          successful = true
          var uid = user.uid;
          console.log(uid)
          await firebaseData.firestore().collection('portfolios').doc(uid).set({
            availableFunds: 10000,
            name: userInput.username,
            ownedStocks: {},
            portfolioWorth: 0,
            photoURL: ""
          })
          router.push('/')
        } else {
          // User is signed out
          // ...
        }
      });
      return signUpCall
    } else {
      // Todo: Make this a popup window in the top right, (not an alert!!)
      let successful = false
      commit('setErrorMessageForAuth', "Please type in a valid username and password")
    }
  },
  changeUserName({ state }, newUsername: string) {
    state.user.displayName = newUsername
    state.user
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
  changeUserPicture({ state }, userLink: string) {
    state.user.photoURL = userLink
    state.user.updateProfile({
      photoURL: userLink
    }).then(function () {
      // Update succcessful
    }).catch(function (error: any) {
      console.error(error)
    })
  }
};

interface State {
  user: Object;
  errorMessageForAuth: any
}

export interface ScreenDimensions {
  width: number;
  height?: number
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
