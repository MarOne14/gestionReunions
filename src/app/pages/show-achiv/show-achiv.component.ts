import { Component } from '@angular/core';

@Component({
  selector: 'app-show-achiv',
  templateUrl: './show-achiv.component.html',
  styleUrls: ['./show-achiv.component.css']
})
export class ShowAchivComponent {
  showPopup = false;

  showForm() {
    this.showPopup = true;
  }
  hideForm() {
    this.showPopup = false;
  }
}
