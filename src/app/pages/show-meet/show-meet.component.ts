import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { ReunionService } from 'src/app/services/reunion.service';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-show-meet',
  templateUrl: './show-meet.component.html',
  styleUrls: ['./show-meet.component.css']
})
export class ShowMeetComponent implements OnInit {
  showPopup = false;
  meetings: any[] = [];
  selectedMeeting: any;
  organizer: any;
  team: any;

  constructor(
    private reunionService: ReunionService,
    private accountService: AccountService,
    private teamService: TeamService
    ) {}

  ngOnInit() {
    this.getUpcomingMeetings();
  }

  getUpcomingMeetings() {
    this.reunionService.getReunionsByEtat().subscribe(
      (meetings) => {
        this.meetings = meetings;
      },
      (error) => {
        console.log('Error fetching meetings:', error);
      }
    );
  }

  showForm() {
    this.showPopup = true;
  }

  hideForm() {
    this.showPopup = false;
    this.showPopup = false;
    this.selectedMeeting = null;
    this.organizer = null;
    this.team = null;
  }

  getMeetingDetails(meeting: any) {
    console.log(meeting);
    
    this.selectedMeeting = meeting;
    this.getOrganizerDetails(meeting.idOrganisateur);
    this.getTeamDetails(meeting.idEquipe);
    this.showPopup = true;
  }

  getOrganizerDetails(organizerId: number) {
    this.accountService.getAccountById(organizerId).subscribe((organizer) => {
      this.organizer = organizer.data[0];
    });
  }

  getTeamDetails(teamId: number) {
    this.teamService.getTeamTitleById(teamId).subscribe((team) => {
      this.team = team.data[0];
    });
  }
}
