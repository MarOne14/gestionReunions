import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Event } from 'src/app/model/event';
import { Team } from 'src/app/model/team';
import { Topic } from 'src/app/model/topic';
import { TeamService } from 'src/app/services/team.service';
import { TopicService } from 'src/app/services/topic.service';
import { TopicComponent } from '../topic/topic.component';
import { DayService } from 'src/app/services/day.service';
import { HoraireService } from 'src/app/services/horaire.service';
import { PeriodeService } from 'src/app/services/periode.service';
import { AccountService } from 'src/app/services/account.service';
import { Meet, MeetingState } from 'src/app/model/meet';
import { Participation } from 'src/app/model/participation';
import { ReunionService } from 'src/app/services/reunion.service';
import { ParticipationService } from 'src/app/services/participation.service';
import { NotificationService } from 'src/app/services/notification.service';
import { InvitationService } from 'src/app/services/invitation.service';



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
  selectedSlot: any = null;
  message : string ="";
  events : Event[];
  selectedDate: Date;
  selectedStartTime: string='';
  selectedDuration: string;
  finishHours :number;
  finishMinutes :number;
  finishTime:string;
  duree : number ;
  reunion:Meet;
  participation : Participation;
  state : MeetingState;
  accountId: any;
  email : string;
  members: any[];
  participations : any[];
  idReunion : number;


  /*************************team selection**************** */
  teams : any[] = [];
  selectedTeam: any;

  constructor(
    private teamService: TeamService,
    private topicService: TopicService,
    private dayService: DayService,
    private periodeService: PeriodeService,
    private horaireService: HoraireService,
    private accountService : AccountService,
    private reunionService : ReunionService,
    private participationService : ParticipationService,
    private notificationService : NotificationService,
    private invitationService : InvitationService
    ) {}

    ngOnInit() {
      this.teamService.getAllTeams().subscribe(response => {
        this.teams = response.data;
      });
    
      this.email = localStorage.getItem('userId');
      this.accountService.getAccountIDByEmail(this.email).subscribe(response => {
        this.accountId = response.data[0].id;
    
      });
    }
    
teamSelected(): void {
  this.teamService.setTeamID(this.selectedTeam.id);
  
}


/**************************************Slots choice ******************/

CurrentAccount: any = null;

showPopup1 = false;

  showForm1(msg : string) {
    this.message=msg;
    this.showPopup1 = true;
  }
  hideForm1() {
    this.message="";
    this.showPopup1 = false;
    this.selectedDate=null;
    this.selectedStartTime = null;
  }

  onSelectedTimeChange(event: any) {
    this.selectedStartTime = event.target.value;
    this.loadWorkingDay();
  }

  private loadWorkingDay(): void {
    const selectedDate = this.formatDate(new Date(this.selectedDate));

    const currentTime = new Date(); // Get current date and time
    const currentDate = currentTime.toISOString().split('T')[0];
    
    if (selectedDate < currentDate) {
      this.message = 'Meeting Date must be the current day or over';
      this.showForm1(this.message);
      return;
    }

    // Check if the selected date is a holiday
    this.dayService.getHolidayByDate(selectedDate).subscribe(
      (holiday: any) => {
        if (holiday.length> 0) {
          const error = "is a holiday" ; 
          this.message = this.selectedDate + "  "+ error;
          this.showForm1(this.message);
        } else {
          // Check if it's a working day
          this.dayService.getPeriodIdWorkingdayByDate(selectedDate).subscribe(
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
                            const heureDebut = horaire.heureDebut;
                            const heureFin = horaire.heureFin;
                            this.checkSelectedTime(heureDebut, heureFin);
                          }
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
              } else {
                const error = "is not a working day" ; 
                this.message = this.selectedDate + "  "+ error;
                this.showForm1(this.message);
              }
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

  
  private checkSelectedTime(heureDebut: string, heureFin: string): void {
    const selectedTime = this.selectedStartTime;
  
    const selectedHours = Number(selectedTime.split(':')[0]);
    const selectedMinutes = Number(selectedTime.split(':')[1]);
  
    const startHours = Number(heureDebut.split(':')[0]);
    const startMinutes = Number(heureDebut.split(':')[1]);
    const endHours = Number(heureFin.split(':')[0]);
    const endMinutes = Number(heureFin.split(':')[1]);
  
    const startTotalMinutes = startHours * 60 + startMinutes;
    const endTotalMinutes = endHours * 60 + endMinutes;
  
    const selectedTotalMinutes = selectedHours * 60 + selectedMinutes;    
    if (selectedTotalMinutes <= startTotalMinutes || selectedTotalMinutes >= endTotalMinutes) {
      const error = "Selected time is within working hours:"
      this.message = error + "\n  " + heureDebut + "   " + heureFin;
      this.showForm1(this.message);
    }
  }
  
  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const formattedDate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;

    return formattedDate;
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
  
  saveTopics() {
    // Check if all topics have valid inputs
    const areInputsValid = this.topics.every((topic) => {
      return topic.title && topic.presenter && topic.duration && topic.details && this.selectedDate && this.selectedStartTime;
    });
  
    if (!areInputsValid) {
      this.message = "Please choose the timing schedule and fill in all the inputs for each topic first";
      this.showForm1(this.message);
      return;
    }
  
    // Sort the topics by order
    const sortedTopics = this.topics.sort((a, b) => a.order - b.order);
  
    // Prepare the topics for saving
    const topicsToSave = sortedTopics.map((topic, index) => {
      return {
        id: topic.id,
        title: topic.title,
        duration: topic.duration,
        details: topic.details,
        order: index + 1,
        presenterId: null,
        presenterEmail: topic.presenter
      };
    });
  
    // Use Promise.all to execute createSubject for each topic with id = 0
    const createPromises = topicsToSave
      .filter((topic) => topic.id === 0)
      .map((topic) => {
        const topicCree = { title: topic.title, details: topic.details };
        return this.topicService.createSubject(topicCree).toPromise();
      });
  
    // Execute the promises to create topics
    Promise.all(createPromises)
      .then((createResponses) => {
        createResponses.forEach((response, index) => {
          const topic = topicsToSave.find((t) => t.id === 0 && t.title === response.titre && t.details === response.details);
          if (topic) {
            topic.id = response.id;
            console.log(`Topic with id ${response.id} created successfully`);
          }
        });
  
        // Use getLastSujetItemId to get the last Sujet ID
        this.topicService.getLastSujetItemId().toPromise()
          .then((lastIdResponse) => {
            const idSujet = lastIdResponse[0]['MAX(id)'];
  
            // Update the new topic's ID with the last retrieved ID
            const newTopic = topicsToSave.find((topic) => topic.id === 0);
            if (newTopic) {
              newTopic.id = idSujet;
              console.log(`Last Sujet ID retrieved successfully for the new topic: ${idSujet}`);
            }
  
            // Use Promise.all to execute getPresenterId for each topic and update the presenterId property
            Promise.all(
              topicsToSave.map((topic) => {
                return this.accountService.getAccountIDByEmail(topic.presenterEmail).toPromise();
              })
            )
              .then((presenterIds) => {
                // Assign the presenterId to the corresponding topic
                topicsToSave.forEach((topic, index) => {
                  topic.presenterId = presenterIds[index].data[0].id;
                });
  
                const totalDuration = topicsToSave.reduce((sum, topic) => sum + topic.duration, 0);
                this.duree = totalDuration;
  
                const startHours = Number(this.selectedStartTime.split(':')[0]);
                const startMinutes = Number(this.selectedStartTime.split(':')[1]);
  
                if (((totalDuration % 60) + startMinutes) >= 60) {
                  this.finishMinutes = ((totalDuration % 60) + startMinutes) - 60;
                } else {
                  this.finishMinutes = (totalDuration % 60) + startMinutes;
                }
                if (totalDuration / 60 < 1) {
                  this.finishHours = startHours;
                  if (((totalDuration % 60) + startMinutes) >= 60) {
                    this.finishHours++;
                  }
                } else {
                  this.finishHours = startHours + totalDuration / 60;
                  if (((totalDuration % 60) + startMinutes) >= 60) {
                    this.finishHours++;
                  }
                }
                const wholeDuration = Math.floor(totalDuration / 60) + 'h ' + (totalDuration % 60) + 'm';
                this.finishTime = this.finishHours.toString().padStart(2, '0') + ':' + this.finishMinutes.toString().padStart(2, '0') + ':00';
                // Create a new array with topics' IDs, orders, and durations
                const topicsWithIds = topicsToSave.map((topic) => {
                  return {
                    id: topic.id,
                    ordre: topic.order,
                    presenter:topic.presenterId,
                    duree: topic.duration
                  };
                });
                this.participations = topicsWithIds;
                console.log("topics inputed :");
                console.log(topicsToSave);
                console.log("table lil participation");
                console.log(topicsWithIds);
                console.log("haadher");
                console.log(this.participations);
                
                console.log('Total Duration:', this.duree, 'minutes');
                console.log('Whole Duration:', wholeDuration);
                console.log('Start Time:', this.selectedStartTime);
                console.log('End Time:', this.finishTime);
                this.selectedDuration = wholeDuration;
              })
              .catch((error) => {
                console.log('Error retrieving presenter IDs:', error);
              });
          })
          .catch((error) => {
            console.log('Error retrieving last Sujet IDs:', error);
          });
      })
      .catch((error) => {
        console.log('Error creating topics:', error);
      });
  }
  saveMeeting() {
    this.teamService.getTeamMembers(this.selectedTeam.id).subscribe(
      (response) => {
        this.members = response.data;
      }
    );
    this.state = MeetingState.planned;
  
    // Create the reunion object
    const reunion = {
      titre: this.title,
      etat: this.state,
      objective: this.objective,
      duree: this.duree,
      type: "urgente",
      idOrganisateur: this.accountId,
      idEquipe: this.selectedTeam.id 
    };
  
    // Create the reunion in the database
    this.reunionService.createReunion(reunion).toPromise()
      .then((reunionResponse) => {
        console.log('Reunion response:', reunionResponse);
  
        // Retrieve the ID for the last reunion item
        this.reunionService.getLastReunionItemId().toPromise()
          .then((lastReunionItemId) => {
            this.idReunion = lastReunionItemId[0]['MAX(id)'];
  
            // Create the reunionurgente object
            const reunionUrgente = {
              id: this.idReunion,
              date: this.selectedDate,
              heureDebut: this.selectedStartTime,
              heureFin: this.finishTime
            };
  
            // Create the reunionurgente in the database
            this.reunionService.createReunionUrgente(reunionUrgente).toPromise()
              .then(() => {
                // Create notifications for each invited team
                const notificationPromises = this.members.map((member) => {
                  const notification = {
                    lire: 0, // Assuming the default value is 0 (not read)
                    idReunion: this.idReunion,
                    idCompte: member.id // Assuming you have the ID of the team account
                  };
                  return this.notificationService.createNotification(notification).toPromise();
                });
                

                // Create participations for each topic
                const participationPromises = this.participations.map((topic) => {
                  const participation = {
                    idCompte: topic.presenter,
                    idReunion: this.idReunion,
                    idSujet: topic.id,
                    heureDebut: this.selectedStartTime,
                    heureFin: this.finishTime,
                    ordre: topic.ordre,
                    duree: topic.duree
                  };
                  return this.participationService.createParticipation(participation).toPromise();
                });
  
                // Execute the promises to create participations
                Promise.all(participationPromises)
                  .then(() => {
                    // Meeting, reunionurgente, and participations are created successfully
                    console.log('Meeting created successfully');
  
                    // Retrieve the participations for this reunion
                    this.participationService.getParticipationsByReunionId(this.idReunion).toPromise()
                      .then((participationsResponse: any[]) => {
                        const participations = participationsResponse;
  
                        // Retrieve the notifications for this reunion
                        this.notificationService.getNotificationsByReunionId(this.idReunion).toPromise()
                          .then((notificationsResponse: any[]) => {
                            const notifications = notificationsResponse;
  
                            // Compare participation and notification based on idCompte
                            participations.forEach((participation) => {
                              const correspondingNotification = notifications.find((notification) => notification.idCompte === participation.idCompte);
                              const msg = "vous avez une participation du sujet dans la reunion :   " + this.title + "  veuilez consulter votre listes des réunions prévenus";
  
                              if (correspondingNotification) {
                                // Create the notificationparticipation object
                                const notificationParticipation = {
                                  id: correspondingNotification.id,
                                  text: msg
                                };
  
                                // Create the notificationparticipation in the database
                                this.invitationService.createNotificationParticipation(notificationParticipation).toPromise()
                                  .then(() => {
                                    console.log('NotificationParticipation created successfully');
                                  })
                                  .catch((error) => {
                                    console.log('Error creating NotificationParticipation:', error);
                                  });
                              }
                            });
                          })
                          .catch((error) => {
                            console.log('Error retrieving notifications:', error);
                          });
                      })
                      .catch((error) => {
                        console.log('Error retrieving participations:', error);
                      });
                  })
                  .catch((error) => {
                    console.log('Error creating participations:', error);
                  });
              })
              .catch((error) => {
                console.log('Error creating reunionurgente:', error);
              });
          })
          .catch((error) => {
            console.log('Error retrieving last reunion item ID:', error);
          });
      })
      .catch((error) => {
        console.log('Error creating reunion:', error);
      });
  }
  
  
}
