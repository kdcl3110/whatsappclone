import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewGroupPage } from './new-group.page';

const routes: Routes = [
  {
    path: '',
    component: NewGroupPage
  },
  {
    path: 'config-group',
    loadChildren: () => import('./config-group/config-group.module').then( m => m.ConfigGroupPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewGroupPageRoutingModule {}
