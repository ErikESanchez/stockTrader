import Vue from "vue";
import { firebaseData } from "../firebase";
import { ActionTree, GetterTree, MutationTree } from "vuex";

const state = {
  user: Object(),
  userClass: Object(),
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
  login({ commit }, userInput: any) {
    console.log(userInput);
    if (userInput.username != "" && userInput.password != "") {
      firebaseData
        .auth()
        .signInWithEmailAndPassword(userInput.username, userInput.password)
        .catch(function(error) {
          let errorCode = error.code;
          let errorMessage = error.message;
          console.log(errorCode, errorMessage);
        });
    }
  },
  async signOut({ commit }) {
    return await firebaseData
      .auth()
      .signOut()
      .then(() => {
        console.log("Signed Out");
        commit("setUserClass", Object());
      })
      .catch(function(error) {
        console.log("Oops... an error occured", error);
      });
  },
  // ? Doesn't let me use an interface to typecasting
  createNewUser({ commit }, userInput: any) {
    if (userInput.username != "" && userInput.password != "") {
      // TODO:  Make an if stament to verfify no duplicate users by checking the database
      firebaseData
        .auth()
        .createUserWithEmailAndPassword(userInput.username, userInput.password)
        .catch(function(error) {
          let errorCode = error.code;
          let errorMessage = error.message;
          console.log(errorCode, errorMessage);
        });
    } else {
      console.log("Please type in a valid username and password");
    }
  },
};

interface userInput {
  username: any;
  password: any;
}

export default {
  state,
  getters,
  mutations,
  actions,
};
