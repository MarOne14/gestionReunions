import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Event } from 'src/app/model/event';
import { UrgentMeet, MeetingState } from 'src/app/model/urgentMeet';
import { Team } from 'src/app/model/team';
import { Topic } from 'src/app/model/topic';
import { UrgentMeetService } from 'src/app/services/urgentMeet.service';
import { TeamService } from 'src/app/services/team.service';
import { TopicService } from 'src/app/services/topic.service';
import { TopicComponent } from '../topic/topic.component';



@Component({
  selector: 'app-new-meet-urg',
  templateUrl: './new-meet-urg.component.html',
  styleUrls: ['./new-meet-urg.component.css']
})
export class NewMeetUrgComponent implements OnInit {

  title: string;
  objective: string;
  selectedTeam1: Team;
  teams1: Team[];
  etat : MeetingState;
  form: FormGroup;
  passwordsMatch :boolean = false;



  /*************************team selection**************** */
  teams : any[] = [];
  selectedTeam: any;

  constructor(
    private teamService: TeamService ,
    private topicService: TopicService,
    private meetService: UrgentMeetService
    ) {}

 ngOnInit() {
  this.teamService.getAllTeams().subscribe(Response=> {
    this.teams = Response.data;
  });
}
teamSelected(): void {
  console.log('Selected team:', this.selectedTeam);
  this.teamService.setTeamID(this.selectedTeam.id);
}

/**************************************Slots choice ******************/
selectedSlot: any = null;
message : string ="";

events : Event[];

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


  // clear the selected inputs
  this.selectedDate = null;
  this.selectedStartTime = null;
  this.selectedDuration = null;
}


/*************************************popup calendar **********/
  showPopup = false;

  showForm() {
    this.showPopup = true;
  }
  hideForm() {
    this.showPopup = false;
  }

  /*******************************manage Agendaa*******************/

  @ViewChild('topicComponent', { static: false })
  topicComponent: TopicComponent;

  topics = [];

  addAgendaItem() {
    this.topics.push({
      title: '',
      presenter: '',
      duration: null,
      details: '',
      order: this.topics.length
    });
  }

  drop(event: CdkDragDrop<Topic[]>) {
    // update the order of the affected topics
    const movedTopic = this.topics[event.previousIndex];
    this.topics[event.previousIndex].order = event.currentIndex;
    if (event.previousIndex < event.currentIndex) {
      for (let i = event.previousIndex + 1; i <= event.currentIndex; i++) {
        this.topics[i].order--;
      }
    } else {
      for (let i = event.currentIndex; i < event.previousIndex; i++) {
        this.topics[i].order++;
      }
    }
    movedTopic.order = event.currentIndex;
    moveItemInArray(this.topics, event.previousIndex, event.currentIndex);
  }

  deleteTopic(topic: Topic) {
    this.topics = this.topics.filter((t) => t !== topic);
  }

  areAllTopicsFilled(): boolean {
    return this.topics.every((topic) => topic.title && topic.presenter && topic.duration && topic.details);
  }
  

  saveTopics() {
    
   /* this.topicService.saveTopics(this.topics).subscribe((savedTopics) => {
      this.topics = savedTopics;
    });*/
  }
  
  
  

  saveMeeting() {
    // sort the topics by order
    const sortedTopics = this.topics.sort((a, b) => a.order - b.order);
    // create the meeting with the sorted topics
    
  }
 
}
