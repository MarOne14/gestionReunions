import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CalendarOptions } from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import { TeamService } from 'src/app/services/team.service';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit{
  /*********************************team selection*****************/
  teams: any[]=[];
  id : number;

  constructor(private teamService: TeamService,private formBuilder: FormBuilder) {
    this.workingDaysForm = this.formBuilder.group({
      monday: [false, Validators.required],
      tuesday: [false, Validators.required],
      wednesday: [false, Validators.required],
      thursday: [false, Validators.required],
      friday: [false, Validators.required],
      saturday: [false],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required]
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

  deleteTeamConfirmation(teamTitle: string): void {
    if (confirm('Are you sure you want to delete this team?')) {
      this.teamService.getTeamIdByTitle(teamTitle).subscribe(
        (idTitle : any) => {
          if (idTitle) {
            this.id = idTitle;
            this.deleteTeam(this.id);
          } else {
            console.log('Team not found');
          }
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  deleteTeam(teamId: number): void {
    this.teamService.deleteTeam(teamId).subscribe(
      (response: any) => {
        console.log(response.message);
        // Handle success or perform any necessary actions
      },
      (error) => {
        console.log(error);
        // Handle error or display an error message
      }
    );
  }  



/*****************************Calendar *************************/
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin]
  };

  list = true;
  calend = false;
  pers = false;

  showInfo() {
    this.list = true;
    this.calend = false;
    this.pers = false;
  }
  hideInfo() {
    this.list = false;
    this.calend = true;
    this.pers = false;
  }
  showusers(){
    this.list = false;
    this.calend = false;
    this.pers = true;
  }
  

  /*********************************************popup calendar**********************/
  
  showPopup = false;
  offshow : boolean = true;
  show : boolean = true;
  selectedOffer: string;
  selectedDate: Date;
  title: string; 
  startTime : Time;
  endTime : Time;
  startDate : Date;
  endDate : Date; 
  workingDays: {
  monday: boolean;
  tuesday: boolean;
  wednesday: boolean,
  thursday: boolean,
  friday: boolean,
  saturday: boolean
};


workingDaysForm: FormGroup;


isAtLeastOneDaySelected(): boolean {
  // Check if at least one weekday is selected
  return Object.values(this.workingDays).some(day => day);
}



  showForm() {
    this.showPopup = true;
  }
  hideForm() {
    this.showPopup = false;
  }

  add(){
    
  }

  update(){

  }

  cancel(){
    this.hideForm();
    this.selectedOffer =null;
  }
  

}


