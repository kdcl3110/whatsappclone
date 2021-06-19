import { ChatItemComponent } from './../../components/chat-item/chat-item.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChatDetailPageRoutingModule } from './chat-detail-routing.module';

import { ChatDetailPage } from './chat-detail.page';
import { PopoverComponent } from 'src/app/components/popover/popover.component';
import { Ionic4EmojiPickerModule } from 'ionic4-emoji-picker'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChatDetailPageRoutingModule,
    Ionic4EmojiPickerModule
  ],
  declarations: [
    ChatDetailPage,
    ChatItemComponent,
    PopoverComponent
  ]
})
export class ChatDetailPageModule { }
