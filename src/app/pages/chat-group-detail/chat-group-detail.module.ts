import { ChatItemGroupComponent } from './../../components/chat-item-group/chat-item-group.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChatGroupDetailPageRoutingModule } from './chat-group-detail-routing.module';

import { ChatGroupDetailPage } from './chat-group-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChatGroupDetailPageRoutingModule
  ],
  declarations: [
    ChatGroupDetailPage,
    ChatItemGroupComponent
  ]
})
export class ChatGroupDetailPageModule {}
