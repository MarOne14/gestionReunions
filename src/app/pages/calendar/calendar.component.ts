import { Component, OnInit } from '@angular/core';
import { BusinessHoursInput, CalendarOptions, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { CalendarService } from 'src/app/services/calendar.service';
import { DayService } from 'src/app/services/day.service';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  holidays: [];

  constructor(private calendarService: CalendarService,private dayService : DayService) {}
  
  ngOnInit(): void {
    this.loadHolidays();
  }

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin],
    businessHours: this.getBusinessHours(),
    events: []
  }


  private getBusinessHours(): BusinessHoursInput {
    return {
      daysOfWeek: [1, 2, 3, 4, 5], // Working days (Monday to Friday)
      startTime: '8:00', // Start time
      endTime: '18:00', // End time
    };
  }


  private loadHolidays(): void {
    this.dayService.getAllHolidays().subscribe(
      holidays => {
        this.calendarOptions.events = this.mapHolidaysToEvents(holidays);
      },
      error => {
        console.log(error);
      }
    );
  }

  private mapHolidaysToEvents(holidays:any[]): EventInput[] {
    return holidays.map(holiday => ({
      title: holiday.titre,
      start: holiday.date,
      allDay: true
    }));
  }

  /*
  handleEventDrop(event: any): void {
    // Update the date of the event in the database
    const updatedEvent = new Event(event.event.start, event.event.title, event.event.extendedProps.type);
    this.calendarService.saveEvent(updatedEvent).subscribe();
  }

  ngOnInit(): void {
    // Update the events array in the calendar config with the latest events
    this.updateCalendarEvents();
  }

   // Function to update the events array in the calendar config
   updateCalendarEvents(): void {
    this.calendarService.getAllEvents().subscribe((events) => {
      this.calendarOptions.events = events.map((event) => {
        return {
          title: event.title,
          start: event.dateFr,
          allDay: true,
          backgroundColor: '#5bc0de'
        };
      });
    });
  }

  // Function to get the background color for an event based on its type
  getEventBackgroundColor(type: EventType): string {
    switch (type) {
      case EventType.JF:
        return '#d9534f'; // Red color for Jour Ferier
      case EventType.Meet:
        return '#5bc0de'; // Blue color for Meeting
      default:
        return '#777'; // Gray color for other events
    }
  }
  
*/

}
