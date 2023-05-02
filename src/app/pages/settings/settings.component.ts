import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CalendarOptions } from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import { Team } from 'src/app/model/team';
import { TeamService } from 'src/app/services/team.service';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  /*********************************team selection*****************/
  teams : Team[] = [];
  team: Team;

  constructor(private teamService: TeamService) {}

 ngOnInit() {
  this.teamService.getAllTeams().subscribe(teams => {
    this.teams = teams;
  });
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

  showForm() {
    this.showPopup = true;
  }
  hideForm() {
    this.showPopup = false;
  }

  update(){

  }

  cancel(){
    this.hideForm();
    this.selectedDate=null;
    this.selectedOffer=null;
  }
  offshow : boolean = true;
  title : string;
  selectedOffer: string;
  selectedDate: string;
  show : boolean = true;

}


