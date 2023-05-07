import { Component } from '@angular/core';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {


  Meet = true;
  Calendar = false;

  showMeet() {
    this.Meet = true;
    this.Calendar = false;
  }

  showCalendar() {
    this.Meet = false;
    this.Calendar = true;
  }

  state : boolean ;
  CurrentUser: User = null;
  email : string ;

  constructor(private userService : UserService,private authService : AuthService) {
    this.email = localStorage.getItem('userId');
    this.userService.getUserByEmail(this.email).subscribe(response => {
      if (response && response.date.length > 0 ) {
        this.CurrentUser = response.date[0];
      }
    });
   }

  ngOnInit() {
    this.state = this.authService.isNewUserSignedUp;
  }

  hideForm() {
    this.state = false;
  }
  hidecForm() {
    this.state = true;
  }

}
