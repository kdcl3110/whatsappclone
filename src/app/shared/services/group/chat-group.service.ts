import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './../auth.service';
import { ChatService } from './../chat.service';
import { Injectable } from '@angular/core';
import { Chat } from '../chat';

@Injectable({
  providedIn: 'root'
})
export class ChatGroupService {
  listUserData: any[] = []

  constructor(
    public chatService: ChatService,
    public authService: AuthService,
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    ) { }

  getListUser(tab: any[]){
    //console.log(this.chatService.users)
    //console.log(tab);
    this.listUserData = []
    for(let id of tab)
      for(let use of this.chatService.users)
        if(id === use.payload.doc.data().uid)
          this.listUserData.push(use.payload.doc.data())
    console.log(this.listUserData)
  }

  addChatGroup(nom, photo){
    let list: any[] = [{ id: this.authService.getCurrentUser(), role: 'admin'}]
    for(let user of this.listUserData)
      list.push({id: user.uid, role: 'user'})
    console.log(list)
    
    let chat: Chat ={
      cid: "",
      users: list,
      nom ,
      photo,
      message: [],
      type: "goup"
    }
    this.afs.collection('chats').add(chat).then(res => {
      let newChat = {
        cid: res.id,
        users: list,
        nom ,
        photo,
        message: [],
        type: "goup"
      }
      this.chatService.setChat(res.id, newChat)
      return res.id
    })
  }
}
