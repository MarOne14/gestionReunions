import { Component, ElementRef, ViewChild } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';



@Component({
  selector: 'app-new-meet-urg',
  templateUrl: './new-meet-urg.component.html',
  styleUrls: ['./new-meet-urg.component.css']
})
export class NewMeetUrgComponent {

  showPopup = false;

  showForm() {
    this.showPopup = true;
  }
  hideForm() {
    this.showPopup = false;
  }
  /***********************Agenda ***********/
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin],
    headerToolbar: {
      start: 'prev,next today',
      center: 'title',
      end: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    events: [
      {
        title: 'Event 1',
        start: '2023-04-11T10:00:00',
        end: '2023-04-11T12:00:00'
      },
      {
        title: 'Event 2',
        start: '2023-04-12T14:00:00',
        end: '2023-04-12T16:00:00'
      }
    ],
    slotDuration: '00:30:00',
    selectable: true,
    editable: true,
    eventClick: this.handleEventClick.bind(this),

  };

  handleEventClick(eventInfo) {
    console.log('Event clicked:', eventInfo.event.title);
  }

  /************************New topic*************/
  @ViewChild('topic', { static: true }) topic!: ElementRef;

  // Add agenda item
  addAgendaItem() {
    // Create new input elements
    const labelTitle = document.createElement('label');
    const inputTitle = document.createElement('input');
    const inputCharge = document.createElement('input');
    const inputDur = document.createElement('input');
    const labelDet = document.createElement('label');
    const inputDet = document.createElement('textarea');
    const ligne = document.createElement('br');
    const ligne1 = document.createElement('hr');

    // Set input attributes
    labelTitle.innerText = 'Topic :';
    inputTitle.setAttribute('type', 'text');
    inputCharge.setAttribute('type', 'text');
    inputDur.setAttribute('type', 'number');
    labelDet.innerText = 'Détails :';

    // Append new input elements to the container
    this.topic.nativeElement.appendChild(ligne1);
    this.topic.nativeElement.appendChild(ligne);
    this.topic.nativeElement.appendChild(labelTitle);
    this.topic.nativeElement.appendChild(ligne);
    this.topic.nativeElement.appendChild(inputTitle);
    this.topic.nativeElement.appendChild(inputCharge);
    this.topic.nativeElement.appendChild(inputDur);
    this.topic.nativeElement.appendChild(ligne);
    this.topic.nativeElement.appendChild(labelDet);
    this.topic.nativeElement.appendChild(ligne);
    this.topic.nativeElement.appendChild(inputDet);


    /*********************Css********************/
    /*******************Labels***********/
    labelTitle.style.fontSize = '20px';
    labelTitle.style.fontWeight = 'bold';
    labelTitle.style.color = '#333';
    labelTitle.style.marginLeft = '18px';
    labelTitle.style.marginTop = '10px';

    labelDet.style.fontSize = '20px';
    labelDet.style.fontWeight = 'bold';
    labelDet.style.color = '#333';
    labelDet.style.marginLeft = '18px';
    labelDet.style.marginTop = '10px';

    /*******************Inputs**********/


  }
}
