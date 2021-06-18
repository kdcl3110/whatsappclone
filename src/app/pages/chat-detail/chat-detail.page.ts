import { AuthService } from './../../shared/services/auth.service';
import { Sms } from './../../shared/services/chat';
import { ChatService } from 'src/app/shared/services/chat.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, of, Subscription } from 'rxjs';
import { CameraService } from 'src/app/shared/services/camera/camera.service';
import { AlertController, ModalController, PopoverController } from '@ionic/angular';
import { PopoverComponent } from 'src/app/components/popover/popover.component';

@Component({
  selector: 'app-chat-detail',
  templateUrl: './chat-detail.page.html',
  styleUrls: ['./chat-detail.page.scss'],
})
export class ChatDetailPage implements OnInit {

  userId: any
  userSend: any
  currentChat: any
  isSend = false
  text: any
  chat: any
  chatSubcribe: Subscription
  image: any
  imageIsSend = false

  scrolling: BehaviorSubject<boolean> = new BehaviorSubject(false);


  constructor(
    public router: ActivatedRoute,
    public chatService: ChatService,
    public authService: AuthService,
    public cameraService: CameraService,
    public alertController: AlertController,
    public popCtrl: PopoverController
  ) { }


  ngOnInit() {
    this.router.params.subscribe(res => {
      this.userId = res.id
      localStorage.setItem('userSend', res.id)
    })
      
    for (let us of this.chatService.users) {
      if (us.payload.doc.data().uid == this.userId) {
        this.userSend = us.payload.doc.data()
      }
    }
    this.chatService.getCurrentChat(this.userSend);
  }

  onMessage(event) {
    let val = event.target.value;
    if (val && val.trim() != "") {
      this.isSend = true;
    } else {
      this.isSend = false;
    }
  }

  async openPopOver(ev){
    const popover = await this.popCtrl.create({
      component: PopoverComponent,
      event: ev
    })
    
    await popover.present()
    
    const {data} = await popover.onDidDismiss()
    
    if(data.fromPopover == 'camera')
      this.addPhoto('camera')
    else if(data.fromPopover == 'library')
      this.addPhoto('library')

    console.log(data)
  }

  addChatMessage(msg) {
    this.text = ''
    let sms: Sms = {
      message: msg,
      sendUser: this.authService.getCurrentUser(),
      dateEnv: new Date().toDateString(),
      status: false,
      asset: ""
    }
    this.chatService.currentChat.dataModif = new Date().toDateString()
    this.chatService.currentChat.message.push(sms)
    this.chatService.setChat(this.chatService.currentChat.cid, this.chatService.currentChat)
    console.log(this.currentChat)
    
    this.isSend = false
  }

  addChatPhoto(msg, photo) {
    this.text = ''
    let url =   'Assets/' + (new Date()).getTime() + 'jpg'
    this.authService.uploadFireBase(url, photo)

    let sms: Sms = {
      message: msg,
      sendUser: this.authService.getCurrentUser(),
      dateEnv: new Date().toDateString(),
      status: false,
      asset: url
    }
    this.chatService.currentChat.dataModif = new Date().toDateString()
    this.chatService.currentChat.message.push(sms)
    this.chatService.setChat(this.chatService.currentChat.cid, this.chatService.currentChat)
    console.log(this.currentChat)
    
    this.isSend = false
  }

  async addPhoto(source: string) {
    if (source === 'camera') {
      console.log('camera');
      const cameraPhoto = await this.cameraService.openCamera();
      this.image = 'data:image/jpg;base64,' + cameraPhoto;
      this.presentAlert()
    } else {
      console.log('library');
      const libraryImage = await this.cameraService.openLibrary();
      this.image = 'data:image/jpg;base64,' + libraryImage;
      this.presentAlert()
    }
    this.imageIsSend = true
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      message: `<img src="${this.image}" style="width: 90%">`,
      inputs: [
        {
          name: 'desc',
          type: 'text',
          placeholder: 'entrer une description',
        }
      ],
      buttons: [
        {
          text: 'annuler',
          role: 'cancel',
        },
        {
          text: 'OK',
          handler : (res) => {
            this.addChatPhoto(res.desc, this.image)
          }
        }

      ]
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

}
