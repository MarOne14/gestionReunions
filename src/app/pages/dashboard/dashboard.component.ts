import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  showPopup = false;

  showForm() {
    this.showPopup = true;
  }
  hideForm() {
    this.showPopup = false;
  }

  Meet = true;
  Task = false;

  showMeet() {
    this.Meet = true;
    this.Task = false;
  }
  hideMeet() {
    this.Meet = false;
    this.Task = true;
  }

}
