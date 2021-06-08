import { ChatItemComponent } from './../../components/chat-item/chat-item.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChatDetailPageRoutingModule } from './chat-detail-routing.module';

import { ChatDetailPage } from './chat-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChatDetailPageRoutingModule
  ],
  declarations: [
    ChatDetailPage,
    ChatItemComponent
  ]
})
export class ChatDetailPageModule { }
