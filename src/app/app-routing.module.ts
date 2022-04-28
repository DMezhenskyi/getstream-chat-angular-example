import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './features/auth/signin/signin.component';
import { SignupComponent } from './features/auth/signup/signup.component';
import { redirectLoggedInTo, canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const routes: Routes = [
  { path: '', redirectTo: 'chat', pathMatch: 'full' },
  { path: 'signin', component: SigninComponent, ...canActivate(() => redirectLoggedInTo(['chat'])) },
  { path: 'signup', component: SignupComponent, ...canActivate(() => redirectLoggedInTo(['chat']))},
  { path: 'chat',
    ...canActivate(() => redirectUnauthorizedTo(['signin'])),
    loadChildren: () => import('./features/chat/chat.module').then(m => m.ChatModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
