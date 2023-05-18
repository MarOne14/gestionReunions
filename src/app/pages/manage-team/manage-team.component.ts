import { Component } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Team } from 'src/app/model/team';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-manage-team',
  templateUrl: './manage-team.component.html',
  styleUrls: ['./manage-team.component.css']
})
export class ManageTeamComponent {
  t1 : string;
  team: Team;
  Team = true;
  Achivement = false;
  newTitle : string;
  newSpeciality : string;
  teamMembers: any[] = [];
  teamsWithMembers: any[] = [];
  
  
  constructor(private route: ActivatedRoute , private teamService: TeamService) { 
    this.t1 = this.route.snapshot.paramMap.get('title');
    this.teamService.setTeamTitle(this.t1);
  }

  setTeamTitle(title: string): void {
    this.teamService.setTeamTitle(title);
  }


  getTeamIdByTitle(teamTitle: string): void {
    this.teamService.getTeamIdByTitle(teamTitle).subscribe(
      (response: any) => {
        if (response.data) {
          const teamId = response.data;
          // Call the method to update the team with the retrieved team ID
          this.updateTeamTitle(teamId, this.newTitle);
        } else {
          console.log('Team not found');
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  updateTeamTitle(teamId: number, newTitle: string): void {
    
  
    this.teamService.updateTeam(teamId, newTitle).subscribe(
      (response: any) => {
        console.log(response.message);
        // Handle success or perform any necessary actions

        // Close the popup
      this.showPopup = false;

      },
      (error) => {
        console.log(error);
        // Handle error or display an error message
      }
    );
    
  }
  

  saveTeamTitle(): void {
    if (this.newTitle) {
      this.getTeamIdByTitle(this.t1);
    } else {
      console.log('New title is required');
    }
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
