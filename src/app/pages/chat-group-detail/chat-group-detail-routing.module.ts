import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChatGroupDetailPage } from './chat-group-detail.page';

const routes: Routes = [
  {
    path: '',
    component: ChatGroupDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatGroupDetailPageRoutingModule {}
