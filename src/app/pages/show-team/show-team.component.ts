import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Team } from 'src/app/model/team';
import { AccountService } from 'src/app/services/account.service';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-show-team',
  templateUrl: './show-team.component.html',
  styleUrls: ['./show-team.component.css']
})
export class ShowTeamComponent {
  
  teamFound: Team;
  members: any[] = [];
  teamTitle: string;
  teams : Team[] = [];
  teamMembers: any;
  id : number;
  newMemberEmail: string;

  constructor(private route: ActivatedRoute, private teamService: TeamService,private accountService : AccountService) { }

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
    this.teamService.getTeamMembers(teamId).subscribe(
      (response) => {
        this.members = response.data;
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



  inviteMember() {
    if (this.newMemberEmail) {
      this.teamService.getTeamIdByTitle(this.teamTitle).subscribe(
        (response: { message: string, data: number }) => {
          const equipeId = response.data; // Get the team ID from the response
          // Get the account ID based on the email
          this.accountService.getAccountIDByEmail(this.newMemberEmail).subscribe(
            (accountIdResponse) => {
              const membreId = accountIdResponse.data[0].id;
              this.hideForm();
              this.teamService.addMemberToEquipe(equipeId, membreId).subscribe(
                () => {
                  console.log('Member added to team successfully');
                },
                (error) => {
                  console.error('Error adding member to team:', error);
                }
              );
            },
            (error) => {
              console.error('Error getting account ID:', error);
            }
          );
        },
        (error) => {
          console.error('Error getting team ID:', error);
        }
      );
    }
  }
}
