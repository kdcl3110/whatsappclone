import { Subscription } from 'rxjs';
import { ChatService } from './../../shared/services/chat.service';
import { AuthService } from './../../shared/services/auth.service';
import { Component, Input, OnInit } from '@angular/core';
import { IonItemSliding } from '@ionic/angular';

@Component({
  selector: 'app-chat-item',
  templateUrl: './chat-item.component.html',
  styleUrls: ['./chat-item.component.scss'],
})
export class ChatItemComponent implements OnInit {
  @Input() chat: any;
  chatSubcribe: Subscription;
  chats: any;
  @Input() userSend: any;
  currentChat: any;

  user = this.authService.getCurrentUser();

  constructor(
    public authService: AuthService,
    public chatService: ChatService
  ) { }

  messageDraged(event, slidingItem: IonItemSliding) {
    if (event.detail.ratio === 1) {
      slidingItem.closeOpened();
    }
  }

  ngOnInit() {
    this.chatSubcribe = this.chatService.chatSubject.subscribe(
      (chat) => {
        this.chatService.getCurrentChat(this.userSend);
        console.log(chat)
        this.chats = chat
      })
    this.chatService.emitChat()
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

}
