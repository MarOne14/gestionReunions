import { Component } from '@angular/core';
import { Account } from 'src/app/model/account';
import { AccountService } from 'src/app/services/account.service';
import { AuthService } from 'src/app/services/auth.service';
import { ReunionService } from 'src/app/services/reunion.service';
import { ShowMeetComponent } from '../show-meet/show-meet.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {


  constructor(
    private userService: AccountService,
    private authService: AuthService,
    private reunionService : ReunionService
     ) {
    this.email = localStorage.getItem('userId');
    this.userService.getAccountByEmail(this.email).subscribe(response => {
      this.CurrentUser= response;
    },
    (error) => {
      console.log(error);
    });
  }  

  Meet = true;
  Calendar = false;

  showMeet() {
    this.Meet = true;
    this.Calendar = false;
    
  }
  search(){
      this.reunionService.setTitle(this.title);
  }

  showCalendar() {
    this.Meet = false;
    this.Calendar = true;
  }

  state : boolean ;
  CurrentUser: Account = null;
  email : string ;
  title : string;

  

  ngOnInit() {
    this.state = this.authService.isNewUserSignedUp;
  }

  hideForm() {
    this.state = false;
  }

}
