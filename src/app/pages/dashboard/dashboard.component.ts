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
  Calendar = false;

  showMeet() {
    this.Meet = true;
    this.Task = false;
    this.Calendar = false;
  }
  hideMeet() {
    this.Meet = false;
    this.Task = true;
    this.Calendar = false;
  }

  showCalendar() {
    this.Meet = false;
    this.Task = false;
    this.Calendar = true;
  }

}
