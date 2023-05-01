import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Team } from 'src/app/model/team';
import { User } from 'src/app/model/user';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-show-team',
  templateUrl: './show-team.component.html',
  styleUrls: ['./show-team.component.css']
})
export class ShowTeamComponent {
  
  t1 : string;
  teamFound: Team;
  members: User[] = [];
  teamTitle: string;
  teams : Team[] = [];

  constructor(private route: ActivatedRoute, private teamService: TeamService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.teamTitle = params['title'];
      this.getTeamMembers();
    });
  }

  getTeamsMembers() {
    this.teamService.getAllTeams().subscribe((teams: Team[]) => {
      this.teamFound = teams.find(team => team.title === this.teamTitle);
       
    if (this.teamFound) {
      this.members = this.teamFound.members;
    }
  });
  }
  getTeamMembers() {
    this.teamService.getAllTeams().subscribe((teams: Team[]) => {
      for (let i = 0; i < teams.length; i++) {
        if (teams[i].title === this.teamTitle) {
          this.teamFound = teams[i];
          break;
        }
      }
         
      if (this.teamFound) {
        this.members = this.teamFound.members;
      }
    });
  }
  

  showPopup = false;

  showForm() {
    this.showPopup = true;
  }
  hideForm() {
    this.showPopup = false;
  }
}
