import { ChatItemGroupComponent } from './../../components/chat-item-group/chat-item-group.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChatGroupDetailPageRoutingModule } from './chat-group-detail-routing.module';

import { ChatGroupDetailPage } from './chat-group-detail.page';
import { PopoverComponent } from 'src/app/components/popover/popover.component';
import { ParamGroupComponent } from '../../components/param-group/param-group.component';
import { Ionic4EmojiPickerModule } from 'ionic4-emoji-picker';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChatGroupDetailPageRoutingModule,
    Ionic4EmojiPickerModule
  ],
  declarations: [
    ChatGroupDetailPage,
    ChatItemGroupComponent,
    PopoverComponent,
    ParamGroupComponent
  ]
})
export class ChatGroupDetailPageModule {}
