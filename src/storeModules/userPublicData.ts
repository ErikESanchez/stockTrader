import { firebaseData } from "@/firebase";
import Vue from "vue";
import { ActionTree, GetterTree, MutationTree } from "vuex";
import { UserPortfolio } from "./portfolio";

const state: State = {
  userPicture: Array(),
  profilePicitureURL: String(),
  profilePicturesURL: Array<UserPictures>(),
};

const getters: GetterTree<any, any> = {
  profilePictureURL(state: State) {
    return state.profilePicitureURL;
  },
  profilePicturesURL(state: State) {
    return state.profilePicturesURL;
  },
};

const mutations: MutationTree<any> = {
  setProfilePictureURL(state: State, url: string) {
    state.profilePicitureURL = url;
  },
  setProfilePicturesURL(state: State, userPictures: Array<UserPictures>) {
    state.profilePicturesURL = userPictures;
  },
};

const actions: ActionTree<any, any> = {
  async uploadUserPicture({ rootGetters }, userPicture) {
    let user = rootGetters["userModule/user"];
    let email: string = user.email;
    let uid: string = rootGetters["userModule/getUser"].uid;
    let userPortfolio: UserPortfolio = rootGetters["portfolio/portfolio"];
    await firebaseData
      .storage()
      .ref(`userProfileImages/${email}`)
      .put(userPicture)
      .then(async (snapshot) => {
        let url: string = await snapshot.ref.getDownloadURL();
        userPortfolio.photoURL = url;
        firebaseData
          .firestore()
          .collection("portfolios")
          .doc(uid)
          .set(
            {
              photoURL: url,
            },
            { merge: true }
          );
      });
  },
  async downloadUserPictures(
    { rootGetters, commit },
    userPortfolios: Array<UserPortfolio>
  ) {
    let currentUserEmail: string = rootGetters["userModule/getUser"].email;
    let userPictures: Array<UserPictures> = [];
    let listOfUsersWithPictures: Array<string> = [];
    await firebaseData
      .storage()
      .ref("userProfileImages")
      .listAll()
      .then((files) => {
        files.items.forEach((result) => {
          listOfUsersWithPictures.push(result.name);
        });
      });
    for (const [index, userEmail] of listOfUsersWithPictures.entries()) {
      await firebaseData
        .storage()
        .ref(`userProfileImages/${userEmail}`)
        .getDownloadURL()
        .then((url: string) => {
          // console.log(url)
          if (currentUserEmail === userEmail) {
            userPictures[index] = {
              name: userEmail,
              file: url,
            };
            commit("setProfilePictureURL", url);
          } else {
            userPictures[index] = {
              name: userEmail,
              file: url,
            };
          }
        });
    }
    commit("setProfilePicturesURL", userPictures);
  },
};

interface State {
  userPicture: Array<any>;
  profilePicitureURL: string;
  profilePicturesURL: Array<UserPictures>;
}

export interface UserPictures {
  name: string | undefined;
  file: any;
}

export default {
  namespaced: true,
  actions,
  mutations,
  getters,
  state,
};
