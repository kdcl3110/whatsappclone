import { ChatService } from './shared/services/chat.service';

import { Component, OnInit } from '@angular/core';
import { LanguageService } from './shared/services/translate/language.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{
  constructor(
    public chatService: ChatService,
    private languageService: LanguageService
  ) {}

  ngOnInit(){
    this.languageService.setInitialAppLanguage()
  }
}
