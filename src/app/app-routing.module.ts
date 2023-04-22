import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { SignUpComponent } from './pages/auth/sign-up/sign-up.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NewMeetOrgComponent } from './pages/new-meet-org/new-meet-org.component';
import { NewMeetUrgComponent } from './pages/new-meet-urg/new-meet-urg.component';
import { ManageMeetComponent } from './pages/manage-meet/manage-meet.component';
import { ManageTeamComponent } from './pages/manage-team/manage-team.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AuthGuard } from './helpers/auth.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'menu', component: DashboardComponent , canActivate: [AuthGuard] },
  { path: 'menu1', component: NewMeetUrgComponent },
  { path: 'menu2', component: NewMeetOrgComponent },
  { path: 'menu2', component: NewMeetOrgComponent },
  { path: 'menu3', component: ManageMeetComponent },
  { path: 'menu4', component: ManageTeamComponent },
  { path: 'profile', component: ProfileComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
