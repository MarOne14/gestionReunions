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
  Calendar = false;

  showMeet() {
    this.Meet = true;
    this.Calendar = false;
  }

  showCalendar() {
    this.Meet = false;
    this.Calendar = true;
  }

}
