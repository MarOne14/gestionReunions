import { Component } from '@angular/core';

@Component({
  selector: 'app-manage-team',
  templateUrl: './manage-team.component.html',
  styleUrls: ['./manage-team.component.css']
})
export class ManageTeamComponent {
  Team = true;
  Achivement = false;

  showTeam() {
    this.Team = true;
    this.Achivement = false;
  }
  hideTeam() {
    this.Team = false;
    this.Achivement = true;
  }
  showPopup = false;

  showForm() {
    this.showPopup = true;
  }
  hideForm() {
    this.showPopup = false;
  }
}
