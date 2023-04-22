import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  
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
