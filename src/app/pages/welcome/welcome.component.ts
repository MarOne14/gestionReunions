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
  Currentuser: User = null;
  email : string ;
  
  constructor(private userService : UserService, private authService : AuthService, private router: Router, public sideBar: SidebarService) {
    this.email = localStorage.getItem('userId');
    this.userService.getUserByEmail(this.email).subscribe(user => {
      this.Currentuser = user;
    });
  }
  
  showPopup = false;

  hideForm() {
    this.showPopup = false;
  }
}
