import Vue from "vue";
import { ActionTree, GetterTree, MutationTree } from "vuex";
import { firebaseData } from "@/firebase";
import router from '@/router'

const state = {
  user: Object(),
};

const getters: GetterTree<any, any> = {
  user: (state: state) => {
    return state.user;
  },
};

const mutations: MutationTree<any> = {
  setUser(state: state, user: any) {
    Vue.set(state, "user", user);
  },
};

const actions: ActionTree<any, any> = {
  async signIn({ state }, userInput: UserInput) {
    if (userInput.username !== "" && userInput.password !== "") {
      await firebaseData
        .auth()
        .signInWithEmailAndPassword(userInput.username, userInput.password)
        .catch(function (error: any) {
          console.log(error.code, error.message);
        });
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
      firebaseData
        .auth()
        .createUserWithEmailAndPassword(userInput.username, userInput.password)
        .catch(function (error: any) {
          console.error(error.code, error.message);
        });
      firebaseData.auth().onAuthStateChanged(async (user: any) => {
        if (user) {
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
    } else {
      // Todo: Make this a popup window in the top right, (not an alert!!)
      console.log("Please type in a valid username and password");
    }
  },
  changeUserName({ state }, userChanges: string) {
    state.user
      .updateProfile({
        displayName: userChanges,
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
    state.user.updateProfile({
      photoURL: userLink
    }).then(function () {
      // Update succcessful
    }).catch(function (error: any) {
      console.error(error)
    })
  }
};

interface state {
  user: Object;
  // account: Account;
  userFetched: Boolean;
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
