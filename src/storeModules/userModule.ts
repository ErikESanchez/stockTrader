import Vue from "vue";
// @ts-ignore
import { ActionTree, GetterTree, MutationTree } from "vuex";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import router from "@/router";
import { auth } from "@/firebase";

const state: State = {
  user: Object(),
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
  async signIn({ commit, getters }, userInput: UserInput) {
    if (userInput.username !== "" && userInput.password !== "") {
      return new Promise((resolve, reject) => {
        signInWithEmailAndPassword(auth, userInput.username, userInput.password)
          .then((userCredential) => {
            commit("setUser", userCredential.user);
            router.push("/");
            return resolve(resolve);
          })
          .catch(function (error: any) {
            // console.log(error.code, error.message);
            return reject(error.code);
          });
      });
    }
  },
  async signOut({ commit }) {
    signOut(auth)
      .then(() => {
        commit("setUser", Object());
      })
      .catch(function (error: any) {});
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
