import { Component } from '@angular/core';

@Component({
  selector: 'app-show-meet',
  templateUrl: './show-meet.component.html',
  styleUrls: ['./show-meet.component.css']
})
export class ShowMeetComponent {
  showPopup = false;

  showForm() {
    this.showPopup = true;
  }
  hideForm() {
    this.showPopup = false;
  }

}
