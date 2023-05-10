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
  team: any;
  Team = true;
  Achivement = false;
  teamMembers: any[] = [];
  teamsWithMembers: any[] = [];
  
  
  constructor(private route: ActivatedRoute, private teamService: TeamService) { 
    this.t1 = this.route.snapshot.paramMap.get('title');
    this.teamService.getTeamByTitle(this.t1).subscribe(team => this.team = team);
    this.teamService.setTeamTitle(this.t1);
  }

  setTeamTitle(title: string): void {
    this.teamService.setTeamTitle(title);
  }
  
  getTeamMembers(title: string): void {
    this.teamService.getTeamMembers(title).subscribe(
      (response) => {
        console.log(response.message);
        this.teamMembers = response.data;
      },
      (error) => {
        console.log(error);
      }
    );
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
