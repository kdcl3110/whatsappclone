import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-param-group',
  templateUrl: './param-group.component.html',
  styleUrls: ['./param-group.component.scss'],
})
export class ParamGroupComponent implements OnInit {
  @Input() group
  
  constructor(
    public modalCtrl: ModalController,
    public alertCtrl: AlertController
  ) { }

  ngOnInit() {
    console.log(this.group)
  }

  async showAlert(){}

  dismiss(){
    this.modalCtrl.dismiss()
  }

}
