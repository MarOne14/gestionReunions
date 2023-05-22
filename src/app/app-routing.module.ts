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
import { SettingsComponent } from './pages/settings/settings.component';
import { AuthGuard } from './helpers/auth.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'menu', component: DashboardComponent , canActivate: [AuthGuard]},
  { path: 'plan/urgent', component: NewMeetUrgComponent , canActivate: [AuthGuard] },
  { path: 'plan/schedule', component: NewMeetOrgComponent , canActivate: [AuthGuard] },
  { path: 'menu3', component: ManageMeetComponent , canActivate: [AuthGuard] },
  { path: 'teams/:title', component: ManageTeamComponent , canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent , canActivate: [AuthGuard] },
  { path: 'Settings', component: SettingsComponent , canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
