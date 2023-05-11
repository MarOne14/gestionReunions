import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Team } from 'src/app/model/team';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-show-team',
  templateUrl: './show-team.component.html',
  styleUrls: ['./show-team.component.css']
})
export class ShowTeamComponent {
  
  teamFound: Team;
  members: string[] = [];
  teamTitle: string;
  teams : Team[] = [];
  teamMembers: any;
  id : number;

  constructor(private route: ActivatedRoute, private teamService: TeamService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.teamTitle = params['title'];
    });
    this.teamTitle=this.teamService.getTeamTitle();
    this.fetchTeamData(this.teamTitle);
  }

  fetchTeamData(teamTitle: string): void {
    this.teamService.getTeamIdByTitle(teamTitle).subscribe(
      (response: { message: string, data: number }) => {
        this.id = response.data; // Assign the team ID to the id variable
        console.log(this.id);
        this.fetchTeamMembers(this.id); // Call the method to fetch team members based on the team ID
      },
      (error) => {
        // Handle the error
        console.log(error);
      }
    );
  }
  

  fetchTeamMembers(teamId: number): void {
    this.teamService.getTeamMembersByTeamId(teamId).subscribe(
      (response: { message: string, data: string[] }) => {
        this.members = response.data; // Assign the team members to the members array
        //console.log(this.members);
        // Do something with the team members (e.g., display them in the template)
      },
      (error) => {
        // Handle the error
        console.log(error);
      }
    );
  }
  
  getColor(str: string): string {
    // A simple hash function to generate a color based on the input string
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const color = Math.abs(hash % 16777215).toString(16);
    return '#' + '0'.repeat(6 - color.length) + color;
  }
  

  

  showPopup = false;

  showForm() {
    this.showPopup = true;
  }
  hideForm() {
    this.showPopup = false;
  }
}
