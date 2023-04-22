import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './pages/auth/login/login.component';
import { SignUpComponent } from './pages/auth/sign-up/sign-up.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { SidebarComponent } from './pages/sidebar/sidebar.component';
import { MatMenuModule } from '@angular/material/menu';
import { NewMeetOrgComponent } from './pages/new-meet-org/new-meet-org.component';
import { NewMeetUrgComponent } from './pages/new-meet-urg/new-meet-urg.component';
import { ManageMeetComponent } from './pages/manage-meet/manage-meet.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FullCalendarModule } from '@fullcalendar/angular';
import { ShowMeetComponent } from './pages/show-meet/show-meet.component';
import { ShowTaskComponent } from './pages/show-task/show-task.component';
import { ManageTeamComponent } from './pages/manage-team/manage-team.component';
import { ShowTeamComponent } from './pages/show-team/show-team.component';
import { ShowAchivComponent } from './pages/show-achiv/show-achiv.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AuthService } from './services/auth.service';
import { TokenInterceptor } from './helpers/token-interceptor';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    DashboardComponent,
    NavbarComponent,
    SidebarComponent,
    NewMeetOrgComponent,
    NewMeetUrgComponent,
    ManageMeetComponent,
    ShowMeetComponent,
    ShowTaskComponent,
    ManageTeamComponent,
    ShowTeamComponent,
    ShowAchivComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatTooltipModule,
    FullCalendarModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
   { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}
   
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
