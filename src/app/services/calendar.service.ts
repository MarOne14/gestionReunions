import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Observable } from 'rxjs';
import { Event, EventType } from 'src/app/model/event';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  private baseUrlE = 'http://localhost:3000';

  // Configuration object for working days and hours
  calendarConfig: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin],
    businessHours: {
      daysOfWeek: [1, 2, 3, 4, 5], // Monday - Friday
      startTime: '08:00', // Start time
      endTime: '17:00' // End time
    },
    events: []
  };
  

  constructor(private http: HttpClient) { }

  getAllEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.baseUrlE}`);
  }

  saveEvent(event: Event): Observable<Event> {
    return this.http.post<Event>(this.baseUrlE, event);
  }

  // Function to update the events array in the calendar config
  updateCalendarEvents(): void {
    this.getAllEvents().subscribe((events) => {
      this.calendarConfig.events = events.map((event) => {
        return {
          title: event.title,
          start: event.dateFr,
          allDay: true,
          backgroundColor: this.getEventBackgroundColor(event.type)
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
}
