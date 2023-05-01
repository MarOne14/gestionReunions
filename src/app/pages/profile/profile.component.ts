import { Component } from '@angular/core';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  appear : boolean = true;
  Currentuser: User = null;
  email : string ;
  users: User[] ;

  constructor(private userService : UserService, ) {
    this.email = localStorage.getItem('userId');
    this.userService.getUserByEmail(this.email).subscribe(user => {
      this.Currentuser = user;
    });
  }
  ngOnInit(): void {
    
  }

  update(){

  }

  cancel(){
    this.appear = true;
  }


  toggleEdit() {
    this.appear = false;
  }

  Info = true;
  Achiv = false;

  showInfo() {
    this.Info = true;
    this.Achiv = false;
  }
  hideInfo() {
    this.Info = false;
    this.Achiv = true;
  }

}
