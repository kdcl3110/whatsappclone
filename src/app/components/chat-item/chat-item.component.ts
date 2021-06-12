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
        this.chatService.findChat(this.userSend.uid);
        console.log(this.chatService.currentChat)
      })
    this.chatService.emitChat()
 
  }

}
