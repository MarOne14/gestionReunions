import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { SidebarService } from 'src/app/services/sidebar.service';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  teams: any[]=[];
  isOpen = true;
  form: FormGroup;
  title : string;
  member : string;
  members: string[] = [];
  teamId : number;


  constructor(
    private router: Router, 
    private sideBar: SidebarService,
    private teamService: TeamService,
    private accountService : AccountService
    ) { 
    sideBar.toggleSidebar.subscribe(() => {
      this.isOpen = !this.isOpen;
    });
  }

  ngOnInit(): void {
    this.loadTeams();
  }

  loadTeams(): void {
    this.teamService.getAllTeams().subscribe(
      (response) => {
        this.teams = response.data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  /*******************/

  hide(): boolean {
    const currentRoute = this.router.url;
    return currentRoute === '/menu3';
  }
  hide1() {
    const currentRoute = this.router.url;
    if (currentRoute === '/menu3')
      this.isOpen = false;
  }

  /**********************error******/
  message : string = '';
  showPopup1 = false;

  showForm1() {
    this.showPopup1 = true;
  }
  hideForm1() {
    this.showPopup1 = false;
  }

  /*******************New Team*************/

  showPopup = false;

  showForm() {
    this.showPopup = true;
  }
  hideForm() {
    this.showPopup = false;
    this.title = '';
    this.members = [];
  }
  
  saveMember() {
    if (this.member && this.member.trim() !== '') {
      // Check if the member exists in the account service
      this.accountService.getAccountByEmail(this.member).subscribe(
        (accountResponse) => {
          if (accountResponse) {
            // Member exists, add to the members array
            this.members.push(this.member);
            this.member = ''; // Clear the input field
          } else {
            // Member does not exist, show error message
            this.message = "That member doesn't exist, please check the email";
            this.showForm1();
          }
        },
        (error) => {
          // Show error message for account service error
        }
      );
    }
  }
  

  onSubmit() {
    this.hideForm1();
    if (!this.title || this.title.trim() === '') {
      this.message = "Please fill in all the inputs first";
      this.showForm1();
      return;
    }
  
    // Check if team with the same title already exists
    this.teamService.getTeamByTitle(this.title).subscribe(
      (response) => {
        if (response=="Team not found") {
          this.message = "That team title already exists, please change it";
          this.showForm1();
        } else {
          // Create the team
          this.teamService.createTeam(this.title).subscribe(
            (teamResponse) => {},
            (error) => {
              // Show error message for team creation
            }
          );
          this.teamService.getTeamIdByTitle(this.title).subscribe(
            (response)=> {
              this.teamId = response.data;
            }
          )
              // Add members to the team
              this.members.forEach((member) => {
                // Check if the member exists in the account service
                this.accountService.getAccountByEmail(member).subscribe(
                  (accountResponse) => {
                    if (accountResponse) {
                      const memberId = accountResponse.id;
                      this.teamService.addMemberToEquipe(this.teamId, memberId).subscribe(
                        (addMemberResponse) => {
                          // Member added successfully
                        },
                        (error) => {
                          // Show error message for adding member
                        }
                      );
                    } else {
                      this.hideForm1();
                      this.message = "That member doesn't exist, please check the email";
                      this.showForm1();
                    }
                  },
                  (error) => {
                    // Show error message for account service error
                  }
                );
              });
  
              // Clear form and members array
              this.title = '';
              this.members = [];
            
        }
      },
      (error) => {
        // Show error message for team retrieval
      }
    );
  }
  
  

}
