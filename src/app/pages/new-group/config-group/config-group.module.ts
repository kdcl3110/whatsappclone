import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfigGroupPageRoutingModule } from './config-group-routing.module';

import { ConfigGroupPage } from './config-group.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfigGroupPageRoutingModule
  ],
  declarations: [ConfigGroupPage]
})
export class ConfigGroupPageModule {}
