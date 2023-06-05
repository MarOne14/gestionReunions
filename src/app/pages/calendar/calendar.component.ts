import { Component, OnInit } from '@angular/core';
import { BusinessHoursInput, CalendarOptions, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { DayService } from 'src/app/services/day.service';
import { HoraireService } from 'src/app/services/horaire.service';
import { PeriodeService } from 'src/app/services/periode.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  holidays: [];
  startTime: string = "08:00";
  finishTime: string = "17:00";
  calendarOptions: CalendarOptions;

  constructor(
    private dayService: DayService,
    private periodeService: PeriodeService,
    private horaireService: HoraireService
  ) {}

  ngOnInit(): void {
    this.calendarOptions = this.initializeCalendarOptions();
    this.loadWorkingDay();
  }

  private initializeCalendarOptions(): CalendarOptions {
    return {
      initialView: 'dayGridMonth',
      plugins: [dayGridPlugin],
      businessHours: this.getBusinessHours(),
      events: []
    };
  }

  private loadWorkingDay(): void {
    // Get today's date
    const today = new Date();
    const formattedDate = this.formatDate(today);

    // Search for the working day based on today's date
    this.dayService.getPeriodIdWorkingdayByDate(formattedDate).subscribe(
      (response: any) => {
        if (response.length > 0) {
          const idPeriode = response[0].idPeriodeTravail;

          // Search for the periodeTravail based on the idPeriode
          this.periodeService.getPeriodeTravailById(idPeriode).subscribe(
            (periodeTravail: any) => {
              if (periodeTravail) {
                const idHoraire = periodeTravail.idHoraire;

                // Search for the horaire based on the idHoraire
                this.horaireService.getHoraireTravailById(idHoraire).subscribe(
                  (horaire: any) => {
                    if (horaire) {
                      this.startTime = horaire.heureDebut;
                      this.finishTime = horaire.heureFin;
                      this.updateBusinessHours();
                      this.loadHolidays(); // Load holidays after updating business hours
                    } else {
                      this.setDefaultBusinessHours();
                      this.loadHolidays(); // Load holidays with default business hours
                    }
                  },
                  (error) => {
                    console.log(error);
                    this.setDefaultBusinessHours();
                    this.loadHolidays(); // Load holidays with default business hours
                  }
                );
              } else {
                this.setDefaultBusinessHours();
                this.loadHolidays(); // Load holidays with default business hours
              }
            },
            (error) => {
              console.log(error);
              this.setDefaultBusinessHours();
              this.loadHolidays(); // Load holidays with default business hours
            }
          );
        } else {
          this.setDefaultBusinessHours();
          this.loadHolidays(); // Load holidays with default business hours
        }
      },
      (error) => {
        console.log(error);
        this.setDefaultBusinessHours();
        this.loadHolidays(); // Load holidays with default business hours
      }
    );
  }

  private loadHolidays(): void {
    this.dayService.getAllHolidays().subscribe(
      (holidays) => {
        this.calendarOptions.events = this.mapHolidaysToEvents(holidays);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  private getBusinessHours(): BusinessHoursInput {
    return {
      daysOfWeek: [1, 2, 3, 4, 5, 6], // Working days (Monday to Saturday)
      startTime: this.startTime, // Start time
      endTime: this.finishTime, // End time
    };
  }

  private updateBusinessHours(): void {
    this.calendarOptions.businessHours = this.getBusinessHours();
  }

  private setDefaultBusinessHours(): void {
    this.startTime = '08:00';
    this.finishTime = '17:00';
    this.updateBusinessHours();
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const formattedDate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;

    return formattedDate;
  }

  private mapHolidaysToEvents(holidays: any[]): EventInput[] {
    return holidays.map((holiday) => ({
      title: holiday.titre,
      start: holiday.date,
      allDay: true
    }));
  }
}
