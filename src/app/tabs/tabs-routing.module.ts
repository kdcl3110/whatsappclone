import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../shared/guard/auth.guard';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'chats',
        loadChildren: () => import('./chats/chats.module').then(m => m.ChatsPageModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'settings',
        loadChildren: () => import('./settings/settings.module').then(m => m.SettingsPageModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'status',
        loadChildren: () => import('./status/status.module').then(m => m.StatusPageModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'chat-new',
        loadChildren: () => import('../pages/chat-new/chat-new.module').then(m => m.ChatNewPageModule),
        canActivate: [AuthGuard]
      },
    ]
  },
  {
    path: '',
    redirectTo: 'tabs/chats',
    pathMatch: 'full'
  },
  {
    path: 'chat-detail/:id',
    loadChildren: () => import('../pages/chat-detail/chat-detail.module').then(m => m.ChatDetailPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule { }
