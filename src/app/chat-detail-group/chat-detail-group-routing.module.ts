import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChatDetailGroupPage } from './chat-detail-group.page';

const routes: Routes = [
  {
    path: '',
    component: ChatDetailGroupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatDetailGroupPageRoutingModule {}
