import { AuthService } from './auth.service';
import { Chat, Sms } from './chat';
import { Injectable, NgZone, OnInit } from '@angular/core';
import { User } from "../services/user";
//import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService implements OnInit {

  users: any;
  id: any;
  sendUser: any;
  chats: any[];
  messageOfChat: any;
  currentChat: any;

  chatSubject = new Subject<any[]>();

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public authService: AuthService
  ) {
    this.getUsers();
    this.getChat();
  }

  emitChat() {
    this.chatSubject.next(this.chats.slice())
  }

  ngOnInit() {
    this.getUsers();
    this.getChat();
  }

  getCurrentChat(userSend) {
    this.currentChat = this.findChat(userSend.uid);
    console.log(this.currentChat)
    if (this.currentChat == "") {
      this.currentChat = this.addChat(userSend, 'unique')
      console.log(this.currentChat)
    }
  }

  findChat(uid) {
    for (let chat of this.chats) {
      if (chat.payload.doc.data().users.length === 2
        && chat.payload.doc.data().users.indexOf(uid) > -1
        && chat.payload.doc.data().users.indexOf(this.authService.getCurrentUser()) > -1
      ) {
        console.log(chat.payload.doc.data().users.indexOf(uid))
        return chat.payload.doc.data()
      }
    }
    return "";
  }

  getUsers() {
    this.afs.collection('users').snapshotChanges().subscribe(ref => {
      this.users = ref
      console.log(ref)
      localStorage.setItem('users', JSON.stringify(ref))
    })
  }

  getChat() {
    this.afs.collection('chats').snapshotChanges().subscribe(ref => {
      this.chats = ref
      console.log(ref)
      this.emitChat()
    })
  }

  addMessageOfChat(message: Sms, uid) {

  }

  addChat(user, typ) {
    let chat: Chat = {
      cid: "",
      users: [user.uid],
      nom: user.displayName,
      photo: user.photoURL,
      message: [],
      type: typ
    }
    this.afs.collection('chats').add(chat).then(res => {
      let newChat = {
        cid: res.id,
        users: [user.uid, this.authService.getCurrentUser()],
        nom: user.displayName,
        photo: user.photoURL,
        message: [],
        type: typ
      }

      this.setChat(res.id, newChat)
      return res.id
    }).catch(res => {
      console.log(res)
    })
  }

  setChat(cid, chat) {
    this.afs.doc(`chats/${cid}`).set(chat, { merge: true })
  }

  // find(id: any) {
  //   this.afs.doc(`users/${id}`).get().subscribe(res => {
  //     return res.data()
  //   })
  // }
}
