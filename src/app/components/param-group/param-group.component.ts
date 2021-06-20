import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AlertController, ModalController } from '@ionic/angular';
import { Router } from "@angular/router";
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CameraService } from 'src/app/shared/services/camera/camera.service';
import { ChatService } from 'src/app/shared/services/chat.service';
import { ChatGroupService } from 'src/app/shared/services/group/chat-group.service';

@Component({
  selector: 'app-param-group',
  templateUrl: './param-group.component.html',
  styleUrls: ['./param-group.component.scss'],
})
export class ParamGroupComponent implements OnInit {
  @Input() group
  @Input() chatId 
  membres = []
  onEdit = false
  image = "https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y"
  description: string =""
  update = false

  chatSubcribe: Subscription
  

  constructor(
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public chatService: ChatService,
    public authService: AuthService,
    public sanitizer: DomSanitizer,
    public cameraService: CameraService,
    public chatGrouService: ChatGroupService,
    public alertController: AlertController,
    public router: Router
  ) { }

  edit(){
    this.onEdit = !this.onEdit
  }

  ngOnInit() {
    
    this.chatSubcribe = this.chatService.chatSubject.subscribe(
      (chat) => {
        this.group = this.chatGrouService.getCurrentChat(this.chatId)
        this.getMembers()
        console.log('KOUNGOUE DIEPE')
      })
    this.chatService.emitChat()
  }
  geturl(url){
    return this.sanitizer.bypassSecurityTrustUrl(url)
  }

  async addPhoto(source: string) {
    if (source === 'camera') {
      console.log('camera');
      const cameraPhoto = await this.cameraService.openCamera();
      this.image = 'data:image/jpg;base64,' + cameraPhoto;
      this.chatGrouService.updatePhoto(this.group.cid, this.image)
    } else {
      console.log('library');
      const libraryImage = await this.cameraService.openLibrary();
      this.image = 'data:image/jpg;base64,' + libraryImage;
      this.chatGrouService.updatePhoto(this.group.cid, this.image)
    }
  }

  updateDesc(){
    console.log(this.description)
    this.chatGrouService.updateDescChat(this.group.cid, this.description)
    this.update = true
    this.onEdit = !this.onEdit
  }

  async showAlert(){}

  dismiss(){
    this.modalCtrl.dismiss()
  }

  getMembers(){
    this.membres = []
    for(let member of this.group.users)
      for(let user of this.chatService.users)
        if(member.id === user.payload.doc.data().uid){
          this.membres.push({
            ...user.payload.doc.data(),
            role: member.role
          })
          console.log(member)
        }
  }

  findCurrentUser(){
    for(let usr of this.membres){
      if(usr.uid == this.authService.getCurrentUser()){
        return usr
      }
    }
  }

  positionCurrent(){
    let i = 0
    for(let usr of this.membres){
      if(usr.uid == this.authService.getCurrentUser()){
        return i
      }
      i++
    }
  }

  findUserPosition(user){
    let i = 0
    for(let usr of this.group.users){
      if(usr.id == user.uid){
        return i
      }
      i++
    }
  }

  async quitte(){
    const alert = await this.alertController.create({
      message: 'voulez vous vrament quitter le groupe?',
      buttons: [
        {text: 'annuler', role: 'cancel'},
        {
          text: 'OK',
          handler : (res) => {
            console.log(this.positionCurrent())
            let position = this.positionCurrent()
            this.group.users.splice(position, 1)
            this.chatGrouService.updateUserChat(this.group.cid, this.group.users)
          }
        }
      ]
    })
    await alert.present()
    const { role } = await alert.onDidDismiss();
    this.modalCtrl.dismiss()
    this.router.navigate(['/tabs/tabs/chats']) 
  }

  async addAdmin(user){
    const alert = await this.alertController.create({
      message: 'cet utilisateur serra maintenant un admin',
      buttons: [
        {text: 'annuler', role: 'cancel'},
        {
          text: 'OK',
          handler : (res) => {
            console.log(this.findUserPosition(user))
            let position = this.findUserPosition(user)
            this.group.users[position] = {id: user.uid, role: 'admin'}
            this.chatGrouService.updateUserChat(this.group.cid, this.group.users)
          }
        }
      ]
    })

    await alert.present()
  }

  async lockCovers(){
    const alert = await this.alertController.create({
      message: 'chats uniquement pour les admins?',
      buttons: [
        {text: 'annuler', role: 'cancel'},
        {
          text: 'OK',
          handler : (res) => {
            this.chatGrouService.lockConversation(this.group.cid, true)  
          }
        }
      ]
    })

    await alert.present()
  }
  unlockCovers(){
    this.chatGrouService.lockConversation(this.group.cid, false)  
  }
}
