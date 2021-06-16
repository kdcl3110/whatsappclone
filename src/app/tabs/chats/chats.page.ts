import { ChatService } from './../../shared/services/chat.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.page.html',
  styleUrls: ['./chats.page.scss'],
})
export class ChatsPage implements OnInit {

  constructor(
    public chatService: ChatService
  ) { 
    console.log(chatService.chats)
  }

  ngOnInit() {
  }

}
