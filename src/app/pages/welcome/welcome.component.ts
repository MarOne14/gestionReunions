import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/services/auth.service';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {
  CurrentUser: User = null;
  email : string ;
  
  constructor(private userService : UserService, private authService : AuthService, public sideBar: SidebarService) {
    this.email = localStorage.getItem('userId');
    this.userService.getUserByEmail(this.email).subscribe(response => {
      if (response && response.date.length > 0 ) {
        this.CurrentUser = response.date[0];
      }
    });
  }
  
  showPopup = false;

  hideForm() {
    this.showPopup = false;
  }
}
