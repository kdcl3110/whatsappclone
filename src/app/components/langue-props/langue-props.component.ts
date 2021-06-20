import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { LanguageService } from 'src/app/shared/services/translate/language.service';

@Component({
  selector: 'app-langue-props',
  templateUrl: './langue-props.component.html',
  styleUrls: ['./langue-props.component.scss'],
})
export class LanguePropsComponent implements OnInit {
  langues = []
  selected = ''

  constructor(
    private popoverCtrl: PopoverController,
    private languageService: LanguageService
  ) { }

  ngOnInit() {
    this.langues = this.languageService.getLanguages()
    this.selected = this.languageService.selected
  }

  select(lgn){
    this.languageService.setLanguage(lgn)
    this.popoverCtrl.dismiss()
  }

}
