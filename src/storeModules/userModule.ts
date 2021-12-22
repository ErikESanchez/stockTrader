import Vue from "vue";
// @ts-ignore
import { ActionTree, GetterTree, MutationTree } from "vuex";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import router from "@/router";

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
      const auth = getAuth();
      console.log("auth", auth);
      new Promise((resolve, reject) => {
        signInWithEmailAndPassword(auth, userInput.username, userInput.password)
          .then((userCredential) => {
            commit("setUser", userCredential.user);
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
      new Promise((resolve, reject) => {}).then(() => {});
      let suc = true;
      const auth = getAuth();
      await createUserWithEmailAndPassword(
        auth,
        userInput.username,
        userInput.password
      )
        .then(() => {
          console.log("IT WORKED");
        })
        .catch((error: any) => {
          suc = false;
        });

      if (suc) return Promise.resolve("KEKW");
      return Promise.reject("KEKK WWWW");
    }
    return Promise.reject("KEKK WWWW");
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
