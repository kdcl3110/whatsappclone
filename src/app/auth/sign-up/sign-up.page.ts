import { CameraService } from './../../shared/services/camera/camera.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  
  userForm: FormGroup
  image = "https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y"

  constructor(
    public authService: AuthService,
    public formBuilder: FormBuilder,
    public cameraService: CameraService
  ) { }

  ngOnInit() {
    this.initForm()
  }

  initForm(){
    this.userForm = this.formBuilder.group({
      username : ['', [Validators.required, Validators.minLength(4)]],
      email : ['', [Validators.required, Validators.email]],
      password : ['', [Validators.required, Validators.minLength(6)]],
    })
  }

  async addPhoto() {
    const libraryImage = await this.cameraService.openLibrary();
    this.image = 'data:image/jpg;base64,' + libraryImage;
  }

}
