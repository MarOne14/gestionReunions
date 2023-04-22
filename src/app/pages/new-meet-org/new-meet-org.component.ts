import { Component, ViewChild, ElementRef } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';

@Component({
  selector: 'app-new-meet-org',
  templateUrl: './new-meet-org.component.html',
  styleUrls: ['./new-meet-org.component.css']
})
export class NewMeetOrgComponent {
  chooseFile() {
    const fileInput = document.getElementById('fileInput');
    fileInput.click();
  }
  onFileSelected(event) {
    const selectedFile = event.target.files[0];
    const fileNameLabel = document.getElementById('fileNameLabel');

    if (selectedFile) {
      fileNameLabel.textContent = selectedFile.name;
    } else {
      fileNameLabel.textContent = '';
    }
  }

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

  @ViewChild('slot', { static: true }) slot!: ElementRef;

  // Add agenda item
  addSlotItem() {
    // Create new input elements
    const inputDate = document.createElement('input');
    const inputTime = document.createElement('input');
    const inputDur = document.createElement('input');
    const ligne = document.createElement('br');

    // Set input attributes
    inputDate.setAttribute('type', 'date');
    inputDate.classList.add('newInput');
    inputTime.setAttribute('type', 'time');
    inputDur.setAttribute('type', 'number');
    inputDur.setAttribute('placeholder', 'Duration (in minutes)');

    // Append new input elements to the container
    this.slot.nativeElement.appendChild(ligne);
    this.slot.nativeElement.appendChild(inputDate);
    this.slot.nativeElement.appendChild(inputTime);
    this.slot.nativeElement.appendChild(inputDur);

    /********************Css *******************/
    /************inpuDate ***********/
    inputDate.style.fontSize = '16px';
    inputDate.style.padding = '10px';
    inputDate.style.border = 'none';
    inputDate.style.appearance = 'none';
    inputDate.style.borderRadius = '8px';
    inputDate.style.boxShadow = '0 0 0 2px #f2f2f2 inset';
    inputDate.style.backgroundColor = '#f2f2f2';
    inputDate.style.margin = '13px';
    inputDate.style.width = '20%';
    inputDate.style.webkitAppearance = 'none';
    inputDate.style.fontFamily = '"Helvetica Neue", sans-serif';
    inputDate.style.color = '#555';
    /************inpuDate ***********/
    inputTime.style.fontSize = '16px';
    inputTime.style.padding = '10px';
    inputTime.style.border = 'none';
    inputTime.style.appearance = 'none';
    inputTime.style.borderRadius = '8px';
    inputTime.style.boxShadow = '0 0 0 2px #f2f2f2 inset';
    inputTime.style.backgroundColor = '#f2f2f2';
    inputTime.style.margin = '13px';
    inputTime.style.width = '20%';
    inputTime.style.webkitAppearance = 'none';
    inputTime.style.fontFamily = '"Helvetica Neue", sans-serif';
    inputTime.style.color = '#555';
    /************inpuDur ***********/
    inputDur.style.fontSize = '16px';
    inputDur.style.padding = '10px';
    inputDur.style.border = 'none';
    inputDur.style.appearance = 'none';
    inputDur.style.borderRadius = '8px';
    inputDur.style.boxShadow = '0 0 0 2px #f2f2f2 inset';
    inputDur.style.backgroundColor = '#f2f2f2';
    inputDur.style.margin = '13px';
    inputDur.style.width = '20%';
    inputDur.style.webkitAppearance = 'none';
    inputDur.style.fontFamily = '"Helvetica Neue", sans-serif';
    inputDur.style.color = '#555';

  }

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
    inputTitle.setAttribute('class', 'aged');
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

    /*
        inputTitle.style.padding = '10px';
        inputTitle.style.fontSize = '16px';
        inputTitle.style.backgroundColor = 'transparent';
        inputTitle.style.borderTop = 'none';
        inputTitle.style.borderRight = 'none';
        inputTitle.style.borderLeft = 'none';
        inputTitle.style.color = '#333';
        inputTitle.style.marginLeft = '15px';
        inputTitle.style.marginBottom = '20px';
        inputTitle.style.width = '30%';
        inputTitle.style.transition = ' border-color 0.3s ease-in-out';
        inputTitle.addEventListener('focus', () => {
          inputTitle.style.border = 'none';
          inputTitle.style.borderBottom = '2px solid #F58F29';
          inputTitle.style.transition = ' border-color 0.3s ease-in-out';
        })*/
  }


}



