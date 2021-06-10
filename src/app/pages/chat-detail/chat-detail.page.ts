import { AuthService } from './../../shared/services/auth.service';
import { Sms } from './../../shared/services/chat';
import { ChatService } from 'src/app/shared/services/chat.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { BehaviorSubject, of, Subscription } from 'rxjs';

@Component({
  selector: 'app-chat-detail',
  templateUrl: './chat-detail.page.html',
  styleUrls: ['./chat-detail.page.scss'],
})
export class ChatDetailPage implements OnInit {

  userId: any
  userSend: any;
  currentChat: any;
  isSend = false;
  text: any;
  //chats: any;


  scrolling: BehaviorSubject<boolean> = new BehaviorSubject(false);


  constructor(
    public router: ActivatedRoute,
    public chatService: ChatService,
    public authService: AuthService
  ) { }


  ngOnInit() {
    // this.scrollToBottom()
    // this.chatSubcribe = this.chatService.chatSubject.subscribe(
    //   (chat) => {
    //     this.chats = chat
    //   })
    // this.chatService.emitChat()

    this.router.params.subscribe(res => {
      this.userId = res.id
      localStorage.setItem('userSend', res.id)
    })

    for (let us of this.chatService.users) {
      if (us.payload.doc.data().uid == this.userId) {
        this.userSend = us.payload.doc.data()
      }
    }

    //this.chatService.getCurrentChat(this.userSend);
    // this.currentChat = this.findChat(this.userSend.uid);
    // console.log("test" + this.currentChat)
    // if (this.currentChat == "") {
    //   this.currentChat = this.chatService.addChat(this.userSend, 'unique')
    //   console.log(this.currentChat)
    // }
  }

  // findChat(uid) {
  //   for (let chat of this.chatService.chats) {
  //     if (chat.payload.doc.data().users.length === 2
  //       && chat.payload.doc.data().users.indexOf(uid) > -1
  //       && chat.payload.doc.data().users.indexOf(this.authService.getCurrentUser()) > -1
  //     ) {
  //       console.log(chat.payload.doc.data().users.indexOf(uid))
  //       return chat.payload.doc.data()
  //     }
  //   }
  //   return "";
  // }

  onMessage(event) {
    let val = event.target.value;
    if (val && val.trim() != "") {
      this.isSend = true;
    } else {
      this.isSend = false;
    }
  }

  addChatMessage(msg) {
    this.text = ''
    let sms: Sms = {
      message: msg,
      sendUser: this.authService.getCurrentUser(),
      dateEnv: new Date(),
      status: false,
      asset: ""
    }
    this.chatService.currentChat.message.push(sms)
    this.chatService.setChat(this.chatService.currentChat.cid, this.chatService.currentChat)
    console.log(this.currentChat)
  }
}
