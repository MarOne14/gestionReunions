import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Team } from 'src/app/model/team';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-manage-team',
  templateUrl: './manage-team.component.html',
  styleUrls: ['./manage-team.component.css']
})
export class ManageTeamComponent {
  t1 : string;
  team: Team =  null;
  Team = true;
  Achivement = false;
  
  
  constructor(private route: ActivatedRoute, private teamService: TeamService) { 
    this.t1 = this.route.snapshot.paramMap.get('title');
    this.teamService.getTeamByTitle(this.t1).subscribe(team => this.team = team);
  }
  

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
