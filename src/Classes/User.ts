import { firebaseData } from "../firebase";
import store from '@/store'
export class User {
    userInfo: userInfo = {
        email: String(),
    }
    constructor() { }
    async fetchUser() {
        return firebaseData.auth().onAuthStateChanged((user) => {
            if (user) {
                this.userInfo.email = user.email as string;
                store.commit('setUser', this.userInfo)
            } else {
                console.log('user is not logged in');
            }
        });
    }
    login(username: string, password: string) {
        if (username != "" && password != "") {
            firebaseData
                .auth()
                .signInWithEmailAndPassword(
                    username,
                    password
                )
                .catch(function (error) {
                    let errorCode = error.code;
                    let errorMessage = error.message;
                    console.log(errorCode, errorMessage);
                });
        }
    }

    async signOut() {
        return await firebaseData.auth().signOut().then(() => {
            console.log("Signed Out");
        }).catch(function (error) {
            console.log("Oops... an error occured", error);
        });
    }
}

interface userInfo {
    email: string;
}
