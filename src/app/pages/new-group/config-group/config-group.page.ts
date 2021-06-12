import { ChatGroupService } from './../../../shared/services/group/chat-group.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-config-group',
  templateUrl: './config-group.page.html',
  styleUrls: ['./config-group.page.scss'],
})
export class ConfigGroupPage implements OnInit {

  image = "https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y"
  constructor(
    public chatGroupService: ChatGroupService
  ) { }

  ngOnInit() {
  }

}
