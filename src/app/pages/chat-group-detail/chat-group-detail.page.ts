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
  ) { }

  ngOnInit() {
    this.router.params.subscribe(res => {
      this.chatId = res.id
    })

    this.chatSubcribe = this.chatService.chatSubject.subscribe(
      (chat) => {
        this.currentChat = this.getCurentChat(this.chatId)
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

  getCurentChat(id){
    for( let chat of this.chatService.chats)
      if(id == chat.payload.doc.data().cid)
        return chat.payload.doc.data()
      
    return ""
  }

  addChatMessage(msg) {}

}
