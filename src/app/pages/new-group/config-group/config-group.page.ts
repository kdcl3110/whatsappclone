import { ChatGroupService } from './../../../shared/services/group/chat-group.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-config-group',
  templateUrl: './config-group.page.html',
  styleUrls: ['./config-group.page.scss'],
})
export class ConfigGroupPage implements OnInit {

  constructor(
    public chatGroupService: ChatGroupService
  ) { }

  ngOnInit() {
  }

}
