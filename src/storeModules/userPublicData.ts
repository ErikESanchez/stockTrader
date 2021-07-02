import { firebaseData } from "@/firebase";
import Vue from "vue";
import { ActionTree, GetterTree, MutationTree } from "vuex";

const state: State = {
    userPicture: Array(),
    profilePicitureURL: String()
}

const getters: GetterTree<any, any> = {
    profilePictureURL(state: State) {
        return state.profilePicitureURL
    }
}

const mutations: MutationTree<any> = {
    setProfilePictureURL(state: State, url: string) {
        state.profilePicitureURL = url
    }
}

const actions: ActionTree<any, any> = {
    uploadUserPicture({ rootGetters }, userPicture) {
        let uid: string = rootGetters["userModule/user"].uid
        console.log(rootGetters["userModule/user"].email)
        firebaseData.storage().ref(`userProfileImages/${uid}`).put(userPicture)
    },
    downloadUserPicture({ rootGetters, commit }) {
        let uid: string = rootGetters["userModule/user"].uid
        firebaseData.storage().ref(`userProfileImages/${uid}`).getDownloadURL().then((url) => {
            console.log(typeof url, url)
            commit('setProfilePictureURL', url)
        })
    }
}

interface State {
    userPicture: Array<any>
    profilePicitureURL: string
}


export default {
    namespaced: true,
    actions,
    mutations,
    getters,
    state,
};
