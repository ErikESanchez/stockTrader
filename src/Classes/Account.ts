import { firebaseData } from "@/firebase";
import { auth } from "firebase";
export class Account {
  uid: string;
  constructor(authUid: string) {
    this.uid = authUid;
  }
  public returnUid() {
    return this.uid;
  }

  public async signIn(email: string, password: string) {
    return await firebaseData.auth().signInWithEmailAndPassword(email, password);
  }

  public async signOut() {
    return await firebaseData.auth().signOut();
  }

  public setAccountData(authUid: string) {
    this.uid = authUid;
  }
}
