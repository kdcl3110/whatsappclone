import { Injectable, NgZone } from '@angular/core';
import { User } from "../services/user";
//import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  userData: any;
  id: any;
  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public afSG: AngularFireStorage,
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    })
  }


  getCurrentUser() {
    let serr = JSON.parse(localStorage.getItem('user'));
    return serr.uid
  }

  // Sign in with email/password
  SignIn(email, password) {
    this.afAuth.authState
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['tabs']);
        });

        this.afs.doc(`users/${result.user.uid}`).update({
          emailVerified : result.user.emailVerified
        })
        //this.SetUserData(result.user);
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  configUser(userName) {
    this.afs.doc(`users/${this.userData.uid}`).update({
      displayName: userName
    }).then((result) => {
      this.router.navigate(['verify-email'])
    })
  }

  SignUp(email, password, userName, image ,imgIsSend) {
    let urlImage
    if(imgIsSend) urlImage = 'Profils/' + (new Date()).getTime() + 'jpg'

    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.SendVerificationMail();
        localStorage.setItem('username', userName);
        if(imgIsSend) this.uploadFireBase(urlImage, image)
        this.SetUserData(result.user, userName, urlImage);
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  async SendVerificationMail() {
    return (await this.afAuth.currentUser).sendEmailVerification()
      .then(() => {
        this.router.navigate(['verify-email']);
      })
  }

  ForgotPassword(passwordResetEmail) {
    return this.afAuth.sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      }).catch((error) => {
        window.alert(error)
      })
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false) ? true : false;
  }

  AuthLogin(provider) {
    return this.afAuth.signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        })
        this.SetUserData(result.user);
      }).catch((error) => {
        window.alert(error)
      })
  }

  uploadFireBase(urlImage: any, image){
    this.afSG.ref(urlImage).putString(image, 'data_url')
  }

  SetUserData(user, userName?:any, imge?:any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: (userName)? userName: user.displayName,
      photoURL: (imge)? imge: user.photoURL,
      emailVerified: user.emailVerified
    }
    return userRef.set(userData, {
      merge: true
    })
  }

  // Sign out 
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['sign-in']);
    })
  }

}