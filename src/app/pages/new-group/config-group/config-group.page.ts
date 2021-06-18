import { CameraService } from './../../../shared/services/camera/camera.service';
import { ChatGroupService } from './../../../shared/services/group/chat-group.service';
import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/shared/services/chat.service';

@Component({
  selector: 'app-config-group',
  templateUrl: './config-group.page.html',
  styleUrls: ['./config-group.page.scss'],
})
export class ConfigGroupPage implements OnInit {

  image = "https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y"
  imageIsSend = false
  
  constructor(
    public chatGroupService: ChatGroupService,
    public cameraService: CameraService,
    public chatService: ChatService
  ) { }

  ngOnInit() {
  }

  async addPhoto(source: string) {
    if (source === 'camera') {
      console.log('camera');
      const cameraPhoto = await this.cameraService.openCamera();
      this.image = 'data:image/jpg;base64,' + cameraPhoto;
    } else {
      console.log('library');
      const libraryImage = await this.cameraService.openLibrary();
      this.image = 'data:image/jpg;base64,' + libraryImage;
    }
    this.imageIsSend = true
  }

}
