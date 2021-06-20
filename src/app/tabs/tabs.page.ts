import { ChatService } from 'src/app/shared/services/chat.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
  tabs: any[] = [
    { id: 'status', name:'TABS.status', badge: 0, icon: 'disc-outline' },
    { id: 'camera', name:'TABS.camera', badge: 0, icon: 'camera-outline', button: true },
    { id: 'chats', name:'TABS.chats', badge: 0, icon: 'chatbubbles-outline' },
    { id: 'settings', name:'TABS.setting', badge: 0, icon: 'cog-outline' },
  ];

  constructor(private chatService: ChatService) {
    console.log(chatService.users)
  }

  ngOnInit() {
  }

}
