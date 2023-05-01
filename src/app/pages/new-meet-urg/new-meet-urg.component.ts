import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import { Team } from 'src/app/model/team';
import { Topic } from 'src/app/model/topic';
import { TeamService } from 'src/app/services/team.service';



@Component({
  selector: 'app-new-meet-urg',
  templateUrl: './new-meet-urg.component.html',
  styleUrls: ['./new-meet-urg.component.css']
})
export class NewMeetUrgComponent {

  /*************************team selection**************** */
  teams : Team[] = [];
  selectedTeam: Team;

  constructor(
    private teamService: TeamService
    ) {}

 ngOnInit() {
  this.teamService.getAllTeams().subscribe(teams => {
    this.teams = teams;
  });
}
teamSelected(): void {
  console.log('Selected team:', this.selectedTeam);
}

/**************************************Slots choice */
selectedSlot: any = null;
message : string ="";

calendarOptions: CalendarOptions = {
  initialView: 'dayGridMonth',
  plugins: [dayGridPlugin],
  eventSources: [this.getSelectedSlotEventSource()],
};
  
  selectedDate: string;
  selectedStartTime: string;
  selectedDuration: number;
  selectedSlots: any[] = [];

getSelectedSlotEventSource() {
  if (this.selectedSlot) {
    return {
      events: [this.selectedSlot],
    };
  } else {
    return [];
  }
}
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
  if (this.selectedSlot) {
    this.showForm1("You have already selected a time slot");
  }
  // check if there is already a selected slot
  if (this.selectedSlots.length > 0) {
    // prompt the user to confirm if they want to replace the selected slot
    if (!confirm('Are you sure you want to replace the current slot with the new one?')) {
      return;
    }
  }
  // create a new time slot object with the selected values
  const newSlot = {
    start: new Date(this.selectedDate + 'T' + this.selectedStartTime),
    end: new Date(new Date(this.selectedDate + 'T' + this.selectedStartTime).getTime() + (this.selectedDuration * 60000))
  };

  // replace the selected slot with the new one
  this.selectedSlots = [newSlot];

  // update the calendar events with the selected slot
  this.calendarOptions.events = this.selectedSlots;

  // clear the selected inputs
  this.selectedDate = null;
  this.selectedStartTime = null;
  this.selectedDuration = null;
}


onDateChange() {
  this.calendarOptions.eventSources = [this.getSelectedSlotEventSource()];
}



/*************************************popup calendar */
  showPopup = false;

  showForm() {
    this.showPopup = true;
  }
  hideForm() {
    this.showPopup = false;
  }

  /*******************************add tnew topic */

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
  
 
}
