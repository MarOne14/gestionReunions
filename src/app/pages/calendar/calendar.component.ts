import { Component } from '@angular/core';
import { BusinessHoursInput, CalendarOptions, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin],
    businessHours: this.getBusinessHours(),
    events: this.getEvents()
  };

  private getBusinessHours(): BusinessHoursInput {
    return {
      daysOfWeek: [1, 2, 3, 4, 5], // Working days (Monday to Friday)
      startTime: '8:00', // Start time
      endTime: '18:00', // End time
    };
  }

  private getEvents(): EventInput[] {
    return [
      {
        title: 'Meeting',
        start: '2023-05-01T10:00:00',
        end: '2023-05-01T11:00:00'
      },
      {
        title: 'Rest day',
        start: '2023-05-02',
        end: '2023-05-02',
        rendering: 'background' // Set background color for resting day
      }
    ];
  }

}
