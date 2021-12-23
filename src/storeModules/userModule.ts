import Vue from "vue";
// @ts-ignore
import { ActionTree, GetterTree, MutationTree } from "vuex";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import router from "@/router";
import { auth } from "@/firebase";

const state: State = {
  user: Object(), // interface userInterface | null
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
};

const actions: ActionTree<any, any> = {
  async signIn({ commit }, userInput: UserInput) {
    if (userInput.username !== "" && userInput.password !== "") {
      return new Promise((resolve, reject) => {
        signInWithEmailAndPassword(auth, userInput.username, userInput.password)
          .then((userCredential) => {
            commit("setUser", userCredential.user);
            router.push("/");
            return resolve(resolve);
          })
          .catch((error: any) => {
            // console.log(error.code, error.message);
            return reject(error.code);
          });
      });
    } else return Promise.reject();
  },
  async signOut({ commit }) {
    await signOut(auth)
      .then(() => {
        commit("setUser", Object());
      })
      .catch(function(error: any) {});
  },
  async createNewUser({ commit }, input: UserInput) {
    if (input.username != "" && input.password != "") {
      return new Promise((resolve, reject) => {
        createUserWithEmailAndPassword(auth, input.username, input.password)
          .then(() => {
            router.push("/");
            return resolve(resolve);
          })
          .catch((error: any) => {
            return reject(error);
          });
      });
    }
  },
  async changeUserName({ state }, newUsername: string) {
    if (auth.currentUser) {
      updateProfile(auth.currentUser, {
        displayName: newUsername,
      })
        .then(function() {
          // Update successful.
        })
        .catch(function(error: any) {
          console.error(error);
          // An error happened.
        });
    }
  },
  changeUserPicture({ state, getters }, userLink: string) {
    if (auth.currentUser) {
      console.log(userLink);
      updateProfile(auth.currentUser, {
        // ? Isn't changing or updating photoURL firebase-side
        photoURL: userLink,
      })
        .then(function() {
          console.log("bruh");
          // Update succcessful
        })
        .catch(function(error: any) {
          console.error(error);
        });
    }
  },
};

interface State {
  user: {
    displayName: string;
    photoURL: string;
  };
}

interface Getters {
  getUser(): string;
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
