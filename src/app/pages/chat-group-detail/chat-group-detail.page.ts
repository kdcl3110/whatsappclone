import { ChatGroupService } from './../../shared/services/group/chat-group.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Sms } from './../../shared/services/chat';
import { Subscription } from 'rxjs';
import { ChatService } from 'src/app/shared/services/chat.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, ModalController, PopoverController } from '@ionic/angular';
import { CameraService } from 'src/app/shared/services/camera/camera.service';
import { PopoverComponent } from 'src/app/components/popover/popover.component';
import { ParamGroupComponent } from 'src/app/components/param-group/param-group.component';

@Component({
  selector: 'app-chat-group-detail',
  templateUrl: './chat-group-detail.page.html',
  styleUrls: ['./chat-group-detail.page.scss'],
})
export class ChatGroupDetailPage implements OnInit {
  currentChat: any
  isSend = false
  text: any
  chatId: any
  chatSubcribe: Subscription
  image: any
  imageIsSend = false
  current =""
  imageBg = 'chat-bg'
  showEmojiPicker:boolean = false
  
  @ViewChild('content') private content: any;
  
  constructor(
    public router: ActivatedRoute,
    public chatService: ChatService,
    public authService: AuthService,
    public chatGroupService: ChatGroupService,
    public cameraService: CameraService,
    public alertController: AlertController,
    public popCtrl: PopoverController,
    public modallCtrl: ModalController
  ) { }

  addEmoji(event) { 
    this.text = this.text + event.data; //Concatinate the emoji with text
    this.isSend = true;
  }

  showemoji(){
    this.showEmojiPicker = !this.showEmojiPicker
  }

  ngOnInit() {
    //this.scrollToBottomOnInit()
    this.router.params.subscribe(res => {
      this.chatId = res.id
    })
    this.chatSubcribe = this.chatService.chatSubject.subscribe(
      (chat) => {
        this.chatGroupService.getCurrentChat(this.chatId)
        console.log(this.chatGroupService.currentChat)
        setTimeout(()=>{
          this.findCurrentUser()
        }, 1000)
      })
    this.chatService.emitChat()
  }
  scrollToBottomOnInit() {
    this.content.scrollToBottom(300);
  }
  
  findCurrentUser(){
    for(let usr of this.chatGroupService.currentChat.users){
      if(usr.id == this.authService.getCurrentUser()){
        this.current = usr 
      }
    }
  }

  async openModal(){
    const modal = await this.modallCtrl.create({
      component: ParamGroupComponent,
      componentProps:{
        'group': this.chatGroupService.currentChat,
        'chatId': this.chatGroupService.currentChat.cid
      }
    })
    modal.present()
    const { role } = await modal.onDidDismiss();
    console.log('onDidDismiss resolved with role', role); 
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

  addChatPhoto(msg, photo) {
    this.text = ''
    let url =   'Assets/' + (new Date()).getTime() + 'jpg'
    this.authService.uploadFireBase(url, photo)

    let sms: Sms = {
      message: msg,
      sendUser: this.authService.getCurrentUser(),
      dateEnv: new Date(),
      status: false,
      asset: url
    }
    this.chatGroupService.currentChat.dataModif = new Date()
    this.chatGroupService.currentChat.message.push(sms)
    this.chatService.setChat(this.chatGroupService.currentChat.cid, this.chatGroupService.currentChat)
    console.log(this.currentChat)
    
    this.isSend = false
  }

  onMessage(event) {
    let val = event.target.value;
    if (val && val.trim() != "") {
      this.isSend = true;
      this.showEmojiPicker = false 
    } else {
      this.isSend = false;
    }
  }

  addChatMessage(msg) {
    this.text = ''
    let sms: Sms = {
      message: msg,
      sendUser: this.authService.getCurrentUser(),
      dateEnv: new Date(),
      status: false,
      asset: ""
    }
    this.chatGroupService.currentChat.dataModif = new Date()
    this.chatGroupService.currentChat.message.push(sms)
    this.chatService.setChat(this.chatGroupService.currentChat.cid, this.chatGroupService.currentChat)
    this.showEmojiPicker = false
    this.isSend = false
  }
}
