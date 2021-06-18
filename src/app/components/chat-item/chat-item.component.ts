import { Subscription } from 'rxjs';
import { ChatService } from './../../shared/services/chat.service';
import { AuthService } from './../../shared/services/auth.service';
import { Component, Input, OnInit } from '@angular/core';
import { IonItemSliding } from '@ionic/angular';
import { DomSanitizer } from '@angular/platform-browser';

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
    public chatService: ChatService,
    public sanitizer: DomSanitizer
  ) { }

  geturl(url){
    return this.sanitizer.bypassSecurityTrustUrl(url)
  }

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
        this.getImageStorage()
      })
    this.chatService.emitChat()
  }

  getImageStorage(){
    for(let img of this.chatService.currentChat.message){
      if(img.asset != ''){
        this.chatService.getImagemsg(img.asset)
      }
    }
  }

}
