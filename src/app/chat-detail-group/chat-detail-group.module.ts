import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChatDetailGroupPageRoutingModule } from './chat-detail-group-routing.module';

import { ChatDetailGroupPage } from './chat-detail-group.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChatDetailGroupPageRoutingModule
  ],
  declarations: [ChatDetailGroupPage]
})
export class ChatDetailGroupPageModule {}
