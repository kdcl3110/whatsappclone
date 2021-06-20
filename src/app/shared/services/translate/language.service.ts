import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

const LNG_KEY = 'SELECTED_LANGUAGE'

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  selected = ''

  constructor(
    private translate: TranslateService,
    private plt: Platform
  ) { }

  setInitialAppLanguage(){
    let language = this.translate.getBrowserLang()
    this.translate.setDefaultLang(language)
    
    let val = localStorage.getItem(LNG_KEY)
    if(val){
      this.setLanguage(val)
      this.selected = val
    }
  }

  getLanguages(){
    return [
      {text: 'English', value: 'en', img: './assets/images/en.png'},
      {text: 'Fançais', value: 'fr', img: './assets/images/fr.png'}
    ]
  }

  setLanguage(lgn){
    this.translate.use(lgn)
    this.selected = lgn
    localStorage.setItem(LNG_KEY, lgn)
  }
}
