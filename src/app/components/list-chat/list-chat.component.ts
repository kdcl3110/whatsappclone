import { AuthService } from './../../shared/services/auth.service';
import { ChatService } from './../../shared/services/chat.service';
import { Component, Input, OnInit } from '@angular/core';
import { ThrowStmt } from '@angular/compiler';
import { AngularFireStorage } from '@angular/fire/storage';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-list-chat',
  templateUrl: './list-chat.component.html',
  styleUrls: ['./list-chat.component.scss'],
})
export class ListChatComponent implements OnInit {
  
  @Input() chats: any[]
  mesChats: any[] = []
  cahtImage = []

  constructor(
    public chatService: ChatService,
    public authService: AuthService,
    public afSG: AngularFireStorage,
    public sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.getNameUserSend()
  }

  geturl(url){
    return this.sanitizer.bypassSecurityTrustUrl(url)
  }

  getImagesStorage(uid, url){
    this.afSG.ref(url).getDownloadURL().subscribe(url =>{
      console.log(url)
      this.cahtImage[uid] = url
      //console.log(this.cahtImage)
    })
  }

  getNameUserSend(){
    //console.log(this.chatService.chats)
    for(let chat of this.chatService.chats){
      if(chat.payload.doc.data().type == 'unique'){
        if(chat.payload.doc.data().users.indexOf(this.authService.getCurrentUser()) > -1){
          this.mesChats.push(chat)
        }
      } else if(chat.payload.doc.data().type == 'goup'){ 
        if( this.findChatUser(chat, this.authService.getCurrentUser())){
          this.mesChats.push(chat)
          if(chat.payload.doc.data().photo != "")
            this.getImagesStorage(chat.payload.doc.data().cid, chat.payload.doc.data().photo)
        }
      } 
    }
    console.log(this.mesChats)
  }

  findChatUser(chat, uid): boolean{
    for(let us of chat.payload.doc.data().users)
      if(us.id == uid)
        return true
    return false
  }

  findUser(chat){
    for(let us of chat.payload.doc.data().users){
      if(us != this.authService.getCurrentUser()){
        for(let user of this.chatService.users){
          if(us == user.payload.doc.data().uid){
            return user.payload.doc.data()
          }
        }
      }
    }
  }

  // getChatGroup(){
  //   for(let chat of this.chatService.chats){
  //     if(chat.chat.payload.doc.data().users.indexOf(this.authService.getCurrentUser()) > -1){
        
  //     }
  //   }
  // }
}
