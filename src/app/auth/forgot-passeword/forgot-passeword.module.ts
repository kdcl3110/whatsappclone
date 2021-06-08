import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ForgotPassewordPageRoutingModule } from './forgot-passeword-routing.module';

import { ForgotPassewordPage } from './forgot-passeword.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ForgotPassewordPageRoutingModule
  ],
  declarations: [ForgotPassewordPage]
})
export class ForgotPassewordPageModule {}
