import { firebaseData } from "../firebase";
export class Account {
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
    createNewUser(userInput: userInput) {
        if (userInput.username != "" && userInput.password != "") {
            // TODO:  Make an if stament to verfify no duplicate users by checking the database
            firebaseData
                .auth()
                .createUserWithEmailAndPassword(
                    userInput.username,
                    userInput.password
                )
                .catch(function (error) {
                    let errorCode = error.code;
                    let errorMessage = error.message;
                    console.log(errorCode, errorMessage);
                });
        } else {
            console.log("Please type in a valid username and password");
        }
    }
}




interface userInput {
    username: string;
    password: string;
}
