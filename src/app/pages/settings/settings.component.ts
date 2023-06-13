import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {FormGroup } from '@angular/forms';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { RoleType } from 'src/app/model/account';
import { DayService } from 'src/app/services/day.service';
import { HoraireService } from 'src/app/services/horaire.service';
import { PeriodeService } from 'src/app/services/periode.service';
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
  verif : boolean;
  currentRole : string;

  constructor(private teamService: TeamService,
    private dayService : DayService,
    private periodeService : PeriodeService,
    private horaireService : HoraireService
    ) {
    this.dayService.getAllHolidays().subscribe((response) => {
      this.holidays = response;
    });
    this.currentRole= localStorage.getItem('role');
  }

  ngOnInit(): void {
    this.loadTeams();
  }

  hide2() : boolean{
    return this.currentRole == RoleType.ADM
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
  showPopup1 = false;
  message : string = "";
  offshow : boolean = true;
  show : boolean = true;
  selectedOffer: string;
  selectedDate: Date;
  title: string; 
  startTime : Time;
  endTime : Time;
  startDate : Date;
  endDate : Date;
  holidays: any[] = [];
  errorMessage: string = '';

workingDaysForm: FormGroup;



showForm1() {
  this.showPopup1 = true;
}
hideForm1() {
  this.showPopup1 = false;
  this.message="";
}

  showForm() {
    this.showPopup = true;
  }
  hideForm() {
    this.showPopup = false;
  }

  onStartDateChange(event: any) {
    this.startDate = event.target.value;
    console.log('Start Date:', this.startDate);
  }
  
  onEndDateChange(event: any) {
    this.endDate = event.target.value;
    console.log('End Date:', this.endDate);
  }
  
  onStartTimeChange(event: any) {
    this.startTime = event.target.value;
    console.log('Start Time:', this.startTime);
  }
  
  onEndTimeChange(event: any) {
    this.endTime = event.target.value;
    console.log('End Time:', this.endTime);
  }

  cancel(){
    this.hideForm();
    this.hideForm1();
    this.selectedOffer =null;
    this.startDate = null;
    this.endDate = null;
    this.startTime = null;
    this.endTime = null;
    this.ngOnInit();
  }
  /*****************************************************Working Days*********************************************/
  update() {

    if (!this.startTime && !this.endTime && !this.startDate && !this.endDate) {
      this.message = 'insert the dates with their time periodes please';
      this.showForm1();
      return;
    }
    const startDate = new Date(this.startDate);
    const endDate = new Date(this.endDate);
    const currentTime = new Date(); // Get current date and time
    const currentDate = currentTime.toISOString().split('T')[0];
    const chekDate = startDate.toISOString().split('T')[0];
    // Check if start date is before end date
  if (startDate >= endDate) {
    this.message = 'Start date must be before end date';
    this.showForm1();
    return;
  }

  // Check if start time is before end time
  if (this.startTime >= this.endTime) {
    this.message = 'Start time must be before end time';
    this.showForm1();
    return;
  }

  // Check if the selected date is after the current date
  if (chekDate < currentDate) {
    this.message = 'Start date must be after the current date';
    this.showForm1();
    return;
  }
  
    // Check if the selected period exists
    this.periodeService.getIdByDates(startDate, endDate).subscribe(
      (response: any) => {
        if (response) {
          const idHoraire = response.id;
          this.updateHoraire(idHoraire);
        } else {
          this.createHoraire();
        }
      },
      (error) => {
        console.log(error);
      }
    );
  
    this.hideForm();
  }
  
  updateHoraire(idHoraire: string) {
    const heureDebut = this.startTime;
    const heureFin = this.endTime;
  
    this.horaireService.updateHoraireTravail(idHoraire, heureDebut, heureFin).subscribe(
      (response: any) => {
        console.log('Horaire updated successfully');
      },
      (error) => {
        console.log(error);
      }
    );
  }
  
  createHoraire() {
    const heureDebut = this.startTime;
    const heureFin = this.endTime;
  
    this.horaireService.createHoraireTravail(heureDebut, heureFin).subscribe(
      (response) => {
        console.log('Horaire created successfully');
        this.getLastHoraireTravailItemId();
      },
      (error) => {
        console.log('Error creating horaire:', error);
      }
    );
  }  
  
  getLastHoraireTravailItemId() {
    this.horaireService.getLastHoraireTravailItemId().subscribe(
      (response: any) => {
        const idHoraire = response[0]['MAX(id)'];
        console.log('Last Horaire ID retrieved successfully:', idHoraire);
        this.createPeriode(idHoraire);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  
  createPeriode(idHoraire: string) {
    const startDate = new Date(this.startDate);
    const endDate = new Date(this.endDate);
  
    this.periodeService.createPeriodeTravail(startDate, endDate, idHoraire).subscribe(
      (response: any) => {
        const idPeriode = response.id;
        console.log('Periode created successfully');
        this.getLastPeriodeTravailItemId();
      },
      (error) => {
        console.log(error);
      }
    );
  }
  
  getLastPeriodeTravailItemId() {
    const startDate = new Date(this.startDate);
    const endDate = new Date(this.endDate);

    this.periodeService.getLastPeriodeTravailItemId().subscribe(
      (response: any) => {
        const lastIdPeriode = response[0]['MAX(id)'];
        console.log('Last Periode ID retrieved successfully:', lastIdPeriode);
        this.insertWorkingDays(startDate, endDate, lastIdPeriode);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  insertWorkingDays(startDate: Date, endDate: Date, idPeriode: string) {
    for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
      const dayOfWeek = date.getDay();
  
      if (dayOfWeek !== 0) { // Skip Sundays (0 represents Sunday)
        const formattedDate = this.formatDate(date);
  
        // Check if the day is a jourFerier
        this.dayService.getHolidayByDate(formattedDate).subscribe(
          (response: any) => {
            if (response.length > 0) {
              console.log(`Skipping holiday (${formattedDate})`);
            } else {
              // Day is not a holiday, insert it as a working day
              this.dayService.createDay(formattedDate, date.getFullYear()).subscribe(
                (response: any) => {
                  console.log(`Day (${formattedDate}) inserted successfully`);
  
                  this.dayService.createWorkingDay(formattedDate, idPeriode).subscribe(
                    (response: any) => {
                      console.log(`Working day (${formattedDate}) inserted successfully`);
                    },
                    (error) => {
                      console.log(error);
                    }
                  );
                },
                (error) => {
                  console.log(error);
                }
              );
            }
          },
          (error) => {
            console.log(error);
          }
        );
      }
    }
    this.hideForm();
    this.selectedOffer = null;
  }
  
  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
  
    const formattedDate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
  
    return formattedDate;
  }
  
  getWeekdayKey(dayOfWeek: number): string {
    switch (dayOfWeek) {
      case 0:
        return 'sunday';
      case 1:
        return 'monday';
      case 2:
        return 'tuesday';
      case 3:
        return 'wednesday';
      case 4:
        return 'thursday';
      case 5:
        return 'friday';
      case 6:
        return 'saturday';
      default:
        return '';
    }
  }
/************************************************Holidays*****************************************/
  
add() {
  // Check if the selected date is a holiday
  const formattedDate = this.formatDate(this.selectedDate);
  this.dayService.getHolidayByDate(formattedDate).subscribe(
    (response: any) => {
      if (response.length > 0) {
        const existingHoliday = response[0];
        const existingTitle = existingHoliday.title;
        this.message = `Holiday '${existingTitle}' already exists on ${formattedDate}`;
        this.showForm1();
      } else {
        // Date is not a holiday, insert it
        this.dayService.createDay(formattedDate, this.selectedDate.getFullYear()).subscribe(
          (response: any) => {
            console.log(`Day (${formattedDate}) inserted successfully`);
            this.createHoliday(formattedDate, this.title);
          },
          (error) => {
            console.log(error);
          }
        );
      }
    },
    (error) => {
      console.log(error);
    }
  );
}

createHoliday(date: string, title: string) {
  this.dayService.createHoliday(date, title).subscribe(
    (response: any) => {
      console.log(`Holiday (${title}) created successfully on ${date}`);
      this.hideForm();
      this.selectedOffer = null;
      this.selectedDate = null;
      this.title = null;
    },
    (error) => {
      console.log(error);
    }
  );
}

}


