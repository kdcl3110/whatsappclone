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
  userSend: any
  currentChat: any
  isSend = false
  text: any
  chat: any;
  chatSubcribe: Subscription;

  scrolling: BehaviorSubject<boolean> = new BehaviorSubject(false);


  constructor(
    public router: ActivatedRoute,
    public chatService: ChatService,
    public authService: AuthService
  ) { }


  ngOnInit() {
    this.router.params.subscribe(res => {
      this.userId = res.id
      localStorage.setItem('userSend', res.id)
    })
      
    for (let us of this.chatService.users) {
      if (us.payload.doc.data().uid == this.userId) {
        this.userSend = us.payload.doc.data()
      }
    }
    this.chatService.getCurrentChat(this.userSend);
  }

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
      dateEnv: new Date().toDateString(),
      status: false,
      asset: ""
    }
    this.chatService.currentChat.dataModif = new Date().toDateString()
    this.chatService.currentChat.message.push(sms)
    this.chatService.setChat(this.chatService.currentChat.cid, this.chatService.currentChat)
    console.log(this.currentChat)
    
    this.isSend = false
  }
}
