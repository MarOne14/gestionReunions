import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import { Team } from 'src/app/model/team';
import { Topic } from 'src/app/model/topic';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-new-meet-org',
  templateUrl: './new-meet-org.component.html',
  styleUrls: ['./new-meet-org.component.css']
})
export class NewMeetOrgComponent {
/*********************************team selection***************** */
  teams : any[] = [];
  selectedTeam: Team;

  constructor(private teamService: TeamService) {}

 ngOnInit() {
  this.teamService.getAllTeams().subscribe(Response=> {
    this.teams = Response.data;
  });
}
teamSelected(): void {
  console.log('Selected team:', this.selectedTeam);
}

/****************************slot selection ******************/

  selectedSlots: any[] = [];
  message : string ="";

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin],
    events: this.selectedSlots,
  };
  selectedDate: string;
  selectedStartTime: string;
  selectedDuration: number;
 
  showPopup1 = false;

  showForm1(msg : string) {
    this.message=msg;
    this.showPopup1 = true;
  }
  hideForm1() {
    this.message="";
    this.showPopup1 = false;
  }
  
  addSlotItem() {
    if (!this.selectedDate || !this.selectedStartTime || !this.selectedDuration) {
      this.showForm1("Please fill in all time slot fields.");
      return;
    }
    
    // create a new time slot object with the selected values
    const newSlot = {
      start: new Date(this.selectedDate + 'T' + this.selectedStartTime),
      end: new Date(new Date(this.selectedDate + 'T' + this.selectedStartTime).getTime() + (this.selectedDuration * 60000))
    };

    // push the new time slot object to the selectedSlots array
    this.selectedSlots.push(newSlot);
    // clear the selected inputs
    this.selectedDate = null;
    this.selectedStartTime = null;
    this.selectedDuration = null;
  }

/*********************************************popup calendar**********************/
  showPopup = false;

  showForm() {
    this.showPopup = true;
  }
  hideForm() {
    this.showPopup = false;
  }

  /*******************************topic additon*********************/

  topics = [];

  addAgendaItem() {
    this.topics.push({
      title: '',
      presenter: '',
      duration: null,
      details: ''
    });
  }
  drop(event: CdkDragDrop<Topic[]>) {
    moveItemInArray(this.topics, event.previousIndex, event.currentIndex);
  }
  
 /**************************** */


}



