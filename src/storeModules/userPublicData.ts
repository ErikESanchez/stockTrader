import { firebaseData } from "@/firebase";
import Vue from "vue";
import { ActionTree, GetterTree, MutationTree } from "vuex";

const state = {
    userPicture: Array()
}

const getters: GetterTree<any, any> = {
}

const mutations: MutationTree<any> = {

}

const actions: ActionTree<any, any> = {
    uploadUserPicture({ dispatch }, userPicture) {
        console.log(userPicture)
        firebaseData.storage().ref('images.jpg').put(userPicture)
    }
}

export default {
    namespaced: true,
    actions,
    mutations,
    getters,
    state,
};
