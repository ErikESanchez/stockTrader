import { firebaseData } from "../firebase";
import store from "@/store";
export class Account {
  user: any;
  constructor(user?: any) {
    this.user = user;
    // console.log(this.signOut());
  }
  login(userInput: userInput) {
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
  }
  async signOut() {
    return await firebaseData
      .auth()
      .signOut()
      .then(() => {
        console.log("Signed Out");
        store.commit("setUserClass", Object());
      })
      .catch(function(error) {
        console.log("Oops... an error occured", error);
      });
  }
  createNewUser(userInput: userInput) {
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
  }
  changeUserProfile(userChanges: string) {
    console.log(userChanges);
    this.user
      .updateProfile({
        displayName: userChanges,
      })
      .then(function() {
        // Update successful.
      })
      .catch(function(error: any) {
        console.error(error);
        // An error happened.
      });
  }
}

export interface userInput {
  username: string;
  password: string;
}

export interface userChanges {
  displayName: string;
}
