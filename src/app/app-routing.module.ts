import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/guard/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'sign-in',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./auth/dasboard/dasboard.module').then(m => m.DasboardPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'sign-in',
    loadChildren: () => import('./auth/sign-in/sign-in.module').then(m => m.SignInPageModule)
  },
  {
    path: 'register-user',
    loadChildren: () => import('./auth/sign-up/sign-up.module').then(m => m.SignUpPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./auth/forgot-passeword/forgot-passeword.module').then(m => m.ForgotPassewordPageModule)
  },
  {
    path: 'verify-email',
    loadChildren: () => import('./auth/verify-email/verify-email.module').then(m => m.VerifyEmailPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'config-user',
    loadChildren: () => import('./auth/config-user/config-user.module').then(m => m.ConfigUserPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'chat-detail',
    loadChildren: () => import('./pages/chat-detail/chat-detail.module').then( m => m.ChatDetailPageModule)
  },
  {
    path: 'new-group',
    loadChildren: () => import('./pages/new-group/new-group.module').then( m => m.NewGroupPageModule)
  },
  
  {
    path: 'chat-group-detail',
    loadChildren: () => import('./pages/chat-group-detail/chat-group-detail.module').then( m => m.ChatGroupDetailPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  