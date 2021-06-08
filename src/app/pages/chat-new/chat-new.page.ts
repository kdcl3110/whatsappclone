import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ChatService } from 'src/app/shared/services/chat.service';

@Component({
  selector: 'app-chat-new',
  templateUrl: './chat-new.page.html',
  styleUrls: ['./chat-new.page.scss'],
})
export class ChatNewPage implements OnInit {

  id: any;
  chats: any;
  constructor(
    public chatService: ChatService,
    public authService: AuthService) { }

  ngOnInit() {
    this.id = this.authService.getCurrentUser()
  }
}
