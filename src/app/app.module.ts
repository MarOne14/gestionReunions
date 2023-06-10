import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './pages/auth/login/login.component';
import { SignUpComponent } from './pages/auth/sign-up/sign-up.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
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
import { SettingsComponent } from './pages/settings/settings.component';
import { TopicComponent } from './pages/topic/topic.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ShowUsersComponent } from './pages/show-users/show-users.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { VoteComponent } from './pages/vote/vote.component';



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
    ProfileComponent,
    SettingsComponent,
    TopicComponent,
    CalendarComponent,
    ShowUsersComponent,
    VoteComponent,
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
    HttpClientModule,
    FullCalendarModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    DragDropModule,
    MatSnackBarModule
  ],
  providers: [
    AuthService
   
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
