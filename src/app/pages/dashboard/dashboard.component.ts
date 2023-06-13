import { Component } from '@angular/core';
import { Account } from 'src/app/model/account';
import { AccountService } from 'src/app/services/account.service';
import { AuthService } from 'src/app/services/auth.service';

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
  CurrentUser: Account = null;
  email : string ;

  constructor(private userService: AccountService, private authService: AuthService) {
    this.email = localStorage.getItem('userId');
    this.userService.getAccountByEmail(this.email).subscribe(response => {
      this.CurrentUser= response;
    },
    (error) => {
      console.log(error);
    });
  }  

  ngOnInit() {
    this.state = this.authService.isNewUserSignedUp;
  }

  hideForm() {
    this.state = false;
  }

}
