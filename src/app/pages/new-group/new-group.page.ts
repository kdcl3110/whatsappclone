import { AuthService } from './../../shared/services/auth.service';
import { ChatService } from './../../shared/services/chat.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-group',
  templateUrl: './new-group.page.html',
  styleUrls: ['./new-group.page.scss'],
})
export class NewGroupPage implements OnInit {
  id: any;
  isSelect: number = 0;

  constructor(
    public chatService: ChatService,
    public authService: AuthService
  ) { }

  ngOnInit() {
    this.id = this.authService.getCurrentUser()
  }

  test(event) {
    if (event.target.checked)
      this.isSelect++
    else
      this.isSelect--
  }
}
