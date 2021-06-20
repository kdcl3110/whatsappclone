import { Component, OnInit, Renderer2 } from '@angular/core';
import { AlertController, PopoverController } from '@ionic/angular';
import { LanguePropsComponent } from 'src/app/components/langue-props/langue-props.component';
import { PopoverComponent } from 'src/app/components/popover/popover.component';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(
    private renderer: Renderer2,
    private popoverCtrl: PopoverController,
    private alertCtrl: AlertController,
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  async openPopover(ev){
    const popover = await this.popoverCtrl.create({
      component: LanguePropsComponent,
      event: ev
    })
    await popover.present()
  }

  async logout(){
    const alert = await this.alertCtrl.create({
      message: "vous allez etre déconnecté",
      buttons: [
        {text: 'annuler', role: 'cancel',},
        {
          text: 'OK',
          handler : (res) => {
            this.authService.SignOut()
          }
        }

      ]
    })
    await alert.present()
  }

  onToogleColorTheme(event){
    if(event.detail.checked){
      // document.body.setAttribute('color-theme', 'dark')
      this.renderer.setAttribute(document.body, 'color-theme', 'dark')
    }else{
      // document.body.setAttribute('color-theme', 'light')
      this.renderer.setAttribute(document.body, 'color-theme', 'light')
    }
  }
}
