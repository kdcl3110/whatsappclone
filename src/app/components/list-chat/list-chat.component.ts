import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-chat',
  templateUrl: './list-chat.component.html',
  styleUrls: ['./list-chat.component.scss'],
})
export class ListChatComponent implements OnInit {
  
  @Input() chats: any[]

  constructor() { }

  ngOnInit() {}

}
