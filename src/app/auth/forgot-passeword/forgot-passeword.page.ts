import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-forgot-passeword',
  templateUrl: './forgot-passeword.page.html',
  styleUrls: ['./forgot-passeword.page.scss'],
})
export class ForgotPassewordPage implements OnInit {

  constructor(
    public authService: AuthService
  ) { }

  ngOnInit() {
  }

}
