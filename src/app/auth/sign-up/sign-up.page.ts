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

  constructor(
    public authService: AuthService,
    public formBuilder: FormBuilder
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

}
