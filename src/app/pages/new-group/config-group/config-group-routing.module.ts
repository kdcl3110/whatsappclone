import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfigGroupPage } from './config-group.page';

const routes: Routes = [
  {
    path: '',
    component: ConfigGroupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfigGroupPageRoutingModule {}
