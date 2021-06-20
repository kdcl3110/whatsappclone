import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './../auth.service';
import { ChatService } from './../chat.service';
import { Injectable } from '@angular/core';
import { Chat } from '../chat';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class ChatGroupService{
  listUserData: any[] = []
  currentChat: any= []

  constructor(
    public chatService: ChatService,
    public authService: AuthService,
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public afSG: AngularFireStorage,
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

  uploadFireBase(urlImage: any, image){
    this.afSG.ref(urlImage).putString(image, 'data_url')
  }

  updatePhoto(cid, image){
    let url = 'Chats/' + (new Date()).getTime() + 'jpg'
    this.uploadFireBase(url, image)
    
    this.afs.doc(`chats/${cid}`).update(
      {photo : url}
    )
  }

  updateUserChat(cid, usrs){
    this.afs.doc(`chats/${cid}`).update(
      {users : usrs}
    )
  }

  updateDescChat(cid, desc){
    this.afs.doc(`chats/${cid}`).update(
      {nom : desc}
    )
  }

  lockConversation(cid, islock){
    this.afs.doc(`chats/${cid}`).update(
      {lock : islock}
    )
  }

  getCurrentChat(cid) {
    for (let chat of this.chatService.chats) {
      if (chat.payload.doc.data().cid === cid) {
        return this.currentChat = chat.payload.doc.data()
      }
    }
  }

  addChatGroup(nom, img, imgIsSend){
    let urlImage=""
    if(imgIsSend){ 
      urlImage = 'Chats/' + (new Date()).getTime() + 'jpg'
      this.uploadFireBase(urlImage, img)
    }

    let list: any[] = [{ id: this.authService.getCurrentUser(), role: 'admin'}]
    for(let user of this.listUserData)
      list.push({id: user.uid, role: 'user'})
    console.log(list)
    
    let chat: Chat ={
      cid: "",
      users: list,
      nom ,
      photo: urlImage,
      message: [
        {
          message: 'nouveau groupe', 
          sendUser: this.authService.getCurrentUser(),
          dateEnv: new Date(),
          status: false,
          asset: ''
        }],
      lock: false,
      type: "goup", 
      dataModif: new Date()
    }
    
    this.afs.collection('chats').add(chat).then(res => {
      let newChat = {
        cid: res.id,
        users: list,
        nom ,
        photo: urlImage,
        message: [
          {
            message: 'nouveau groupe', 
            sendUser: this.authService.getCurrentUser(),
            dateEnv: new Date(),
            status: false,
            asset: ''
          }],
        type: "goup",
        lock: false,
        dataModif: new Date()
      }
      this.chatService.setChat(res.id, newChat)
      this.router.navigate(['/tabs/chat-group-detail', res.id])
    })
  }
}
