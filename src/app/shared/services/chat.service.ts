import { AuthService } from './auth.service';
import { Chat, Sms } from './chat';
import { Injectable, NgZone, OnInit } from '@angular/core';
import { User } from "../services/user";
//import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";
import { Subject } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class ChatService implements OnInit {
  users: any
  id: any
  sendUser: any = ""
  chats: any[] = []
  messageOfChat: any
  currentChat: any = ""
  imageUser = []
  imageChat = []
  chatProfil = []

  chatSubject = new Subject<any[]>();

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public authService: AuthService,
    public afSG: AngularFireStorage,
  ) {
    this.getUsers();
    this.getChat();
  }

  getUser(uid){
    for(let user of this.users){
      if(user.payload.doc.data().uid == uid){
        return user.payload.doc.data()
      }
    }
    return null
  }

  getImagesStorage(uid, url){
    this.afSG.ref(url).getDownloadURL().subscribe(url =>{
      //console.log(url)
      this.imageUser[uid] = url
      console.log(this.imageUser)
    })
  }

  getImagemsg(ref){
    this.afSG.ref(ref).getDownloadURL().subscribe(url =>{
      this.imageChat[ref] = url
    })
  }

  getProfilChat(cid, url){
    this.afSG.ref(url).getDownloadURL().subscribe(url =>{
      this.chatProfil[cid] = url
      console.log(this.chatProfil)
    })
  }


  emitChat() {
    this.chatSubject.next(this.chats.slice())
  }

  ngOnInit() {
    this.getUsers();
    this.getChat();
  }

  getCurrentChat(userSend) {
    this.findChat(userSend.uid)
    if (this.currentChat == "") {
      this.addChat(userSend, 'unique')
    }
  }

  findChat(uid) {
    for (let chat of this.chats) {
      if (chat.payload.doc.data().type === 'unique'
        && chat.payload.doc.data().users.indexOf(uid) > -1
        && chat.payload.doc.data().users.indexOf(this.authService.getCurrentUser()) > -1
      ) {
        return this.currentChat = chat.payload.doc.data()
      }
    }
    return this.currentChat =  "";
  }

  getUsers() {
    this.afs.collection('users').snapshotChanges().subscribe(ref => {
      this.users = ref
      localStorage.setItem('users', JSON.stringify(ref))

      ref.forEach(val =>{
        let url = val.payload.doc.get('photoURL')
        let uid = val.payload.doc.get('uid')
        console.log(url)
        if(url != null)
          this.getImagesStorage(uid, url)
      })
    })
  }

  getChat() {
    this.afs.collection('chats').snapshotChanges().subscribe(ref => {
      this.chats = ref
      console.log(ref)
      ref.forEach(val => {
        let url = val.payload.doc.get('photo')
        let cid = val.payload.doc.get('cid')
        if(url != '')
          this.getProfilChat(cid, url)
      })
      this.emitChat()
    })
  }

  addChat(user, typ) {
    let chat: Chat = {
      cid: "",
      users: [user.uid],
      nom: user.displayName,
      photo: user.photoURL,
      message: [],
      type: typ,
      dataModif: (new Date()).toDateString()
    }
    this.afs.collection('chats').add(chat).then(res => {
      let newChat: Chat = {
        cid: res.id,
        users: [user.uid, this.authService.getCurrentUser()],
        nom: user.displayName,
        photo: user.photoURL,
        message: [],
        type: typ,
        dataModif: (new Date()).toDateString()
      }

      this.setChat(res.id, newChat)
    }).catch(res => {
      console.log(res)
    })
  }

  getCountMessage(chat){
    let count = 0
    for(let message of chat.payload.doc.data().message){
      if(message.status == false){
        count++
      }
    }
    return count
  }

  setChat(cid, chat) {
    this.afs.doc(`chats/${cid}`).set(chat, { merge: true })
  }
}
