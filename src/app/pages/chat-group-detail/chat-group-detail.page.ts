import { ChatGroupService } from './../../shared/services/group/chat-group.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Sms } from './../../shared/services/chat';
import { Subscription } from 'rxjs';
import { ChatService } from 'src/app/shared/services/chat.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-group-detail',
  templateUrl: './chat-group-detail.page.html',
  styleUrls: ['./chat-group-detail.page.scss'],
})
export class ChatGroupDetailPage implements OnInit {
  currentChat: any
  isSend = false
  text: any
  chatId: any
  chatSubcribe: Subscription

  constructor(
    public router: ActivatedRoute,
    public chatService: ChatService,
    public authService: AuthService,
    public chatGroupService: ChatGroupService
  ) { }

  ngOnInit() {
    this.router.params.subscribe(res => {
      this.chatId = res.id
    })
    
    this.chatSubcribe = this.chatService.chatSubject.subscribe(
      (chat) => {
        this.chatGroupService.getCurrentChat(this.chatId)
        console.log(this.chatGroupService.currentChat)
      })
    this.chatService.emitChat()
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
    this.chatGroupService.currentChat.dataModif = new Date().toDateString()
    this.chatGroupService.currentChat.message.push(sms)
    this.chatService.setChat(this.chatGroupService.currentChat.cid, this.chatGroupService.currentChat)
    
    this.isSend = false
  }
}
