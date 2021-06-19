import { IonItemSliding } from '@ionic/angular';
import { AuthService } from './../../shared/services/auth.service';
import { ChatGroupService } from './../../shared/services/group/chat-group.service';
import { Component, OnInit} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ChatService } from 'src/app/shared/services/chat.service';

@Component({
  selector: 'app-chat-item-group',
  templateUrl: './chat-item-group.component.html',
  styleUrls: ['./chat-item-group.component.scss'],
})
export class ChatItemGroupComponent implements OnInit {

  user = this.authService.getCurrentUser();
  constructor(
    public chatGroupService: ChatGroupService,
    public authService: AuthService,
    public sanitizer: DomSanitizer,
    public chatService: ChatService
  ) { }

  messageDraged(event, slidingItem: IonItemSliding) {
    if (event.detail.ratio === 1) {
      slidingItem.closeOpened();
    }
  }
  geturl(url){
    return this.sanitizer.bypassSecurityTrustUrl(url)
  }
  ngOnInit() {}

}
