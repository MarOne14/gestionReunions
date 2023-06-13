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
import { CreneauService } from 'src/app/services/creneau.service';
import { VoteService } from 'src/app/services/vote.service';

@Component({
  selector: 'app-new-meet-org',
  templateUrl: './new-meet-org.component.html',
  styleUrls: ['./new-meet-org.component.css']
})
export class NewMeetOrgComponent implements OnInit {

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
  creneaux : any;


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
    private invitationService : InvitationService,
    private creneauService : CreneauService,
    private voteService : VoteService
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
selectedSlots: any[] = [];

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

  addSlotItem() {
    // Check if the selected date and start time already exist in one of the slots
    const isSlotExists = this.selectedSlots.some(
      (slot) =>
        slot.date === this.selectedDate && slot.startTime === this.selectedStartTime
    );
  
    if (isSlotExists) {
      this.message = 'Slot already exists , change it ';
      this.showForm1(this.message);
      return;
    }
    // create a new time slot object with the selected values
    const newSlot = {
      date: this.selectedDate,
      startTime: this.selectedStartTime
    };
    // push the new time slot object to the selectedSlots array
    this.selectedSlots.push(newSlot);
    // clear the selected inputs
    this.selectedDate = null;
    this.selectedStartTime = null;
    console.log(this.selectedSlots);
  }

  insertSlotsIntoCreneauTable() {
    const creneauPromises = [];
    for (const slot of this.selectedSlots) {
      const creneau = {
        idReunion: this.idReunion, // ID of the meeting you created earlier
        date: slot.date,
        heureDebut: slot.startTime,
      };
      const createCreneauPromise = this.creneauService.createCreneau(creneau).toPromise();
      creneauPromises.push(createCreneauPromise);
    }
  
    // Execute the promises to create creneaux
    Promise.all(creneauPromises)
      .then((creneauxResponse: any[]) => {
        const createdCreneaux = creneauxResponse;
        console.log('Creneaux created:', createdCreneaux);
        
        // Retrieve the creneaux for this reunion
        this.creneauService.getCreneauxByReunionId(this.idReunion).toPromise()
          .then((retrievedCreneaux: any[]) => {
            console.log('Creneaux retrieved:', retrievedCreneaux);
            const creneauCount = retrievedCreneaux.length;
  
            // Create votes for each member and assign creneaux sequentially
            const votePromises = this.members.map((member, index) => {
              const creneau = retrievedCreneaux[index % creneauCount];
              const vote = {
                idCreneau: creneau.id,
                idCompte: member.id,
                etat: 0
              };
              return this.voteService.createVote(vote).toPromise();
            });
  
            // Execute the promises to create votes
            Promise.all(votePromises)
              .then(() => {
                console.log('Votes created successfully');
              })
              .catch((error) => {
                console.log('Error creating votes:', error);
              });
          })
          .catch((error) => {
            console.log('Error retrieving creneaux:', error);
          });
      })
      .catch((error) => {
        console.error('Failed to create creneaux:', error);
      });
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
      return (
        topic.title &&
        topic.presenter &&
        topic.duration &&
        topic.details &&
        this.selectedDate &&
        this.selectedStartTime
      );
    });
  
    if (!areInputsValid) {
      this.message =
        "Please choose the timing schedule and fill in all the inputs for each topic first";
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
        presenterEmail: topic.presenter,
        startTime: null,
        finishTime: null,
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
          const topic = topicsToSave.find(
            (t) =>
              t.id === 0 &&
              t.title === response.titre &&
              t.details === response.details
          );
          if (topic) {
            topic.id = response.id;
            console.log(`Topic with id ${response.id} created successfully`);
          }
        });
  
        // Use getLastSujetItemId to get the last Sujet ID
        this.topicService
          .getLastSujetItemId()
          .toPromise()
          .then((lastIdResponse) => {
            const idSujet = lastIdResponse[0]["MAX(id)"];
  
            // Update the new topic IDs with the last retrieved ID
            let newTopicsCount = 0;
            topicsToSave.forEach((topic) => {
              if (topic.id === 0) {
                topic.id = idSujet + newTopicsCount;
                newTopicsCount++;
              }
            });
  
            // Use Promise.all to execute getPresenterId for each topic and update the presenterId property
            Promise.all(
              topicsToSave.map((topic) => {
                return this.accountService
                  .getAccountIDByEmail(topic.presenterEmail)
                  .toPromise();
              })
            )
              .then((presenterIds) => {
                // Assign the presenterId to the corresponding topic
                topicsToSave.forEach((topic, index) => {
                  topic.presenterId = presenterIds[index].data[0].id;
                });
  
                const totalDuration = topicsToSave.reduce(
                  (sum, topic) => sum + topic.duration,
                  0
                );
                this.duree = totalDuration;
  
                const startHours = Number(this.selectedStartTime.split(":")[0]);
                const startMinutes = Number(
                  this.selectedStartTime.split(":")[1]
                );
  
                let accumulatedMinutes = 0;
  
                const topicsWithIds = topicsToSave.map((topic) => {
                  const startTime = this.calculateStartTime(
                    startHours,
                    startMinutes,
                    accumulatedMinutes
                  );
                  const finishTime = this.calculateFinishTime(
                    startHours,
                    startMinutes,
                    accumulatedMinutes,
                    topic.duration
                  );
                  accumulatedMinutes += topic.duration;
  
                  topic.startTime = startTime;
                  topic.finishTime = finishTime;
  
                  return {
                    id: topic.id,
                    ordre: topic.order,
                    presenter: topic.presenterId,
                    duree: topic.duration,
                    startTime: startTime,
                    finishTime: finishTime,
                  };
                });
  
                const wholeDuration =
                  Math.floor(totalDuration / 60) +
                  "h " +
                  (totalDuration % 60) +
                  "m";
                this.finishTime = topicsWithIds[topicsWithIds.length - 1].finishTime;
  
                this.participations = topicsWithIds;
                console.log("topics inputed :");
                console.log(topicsToSave);
                console.log("table lil participation");
                console.log(topicsWithIds);
                console.log("haadher");
                console.log(this.participations);
  
                console.log("Total Duration:", this.duree, "minutes");
                console.log("Whole Duration:", wholeDuration);
                console.log("Start Time:", this.selectedStartTime);
                console.log("End Time:", this.finishTime);
                this.selectedDuration = wholeDuration;
              })
              .catch((error) => {
                console.log("Error retrieving presenter IDs:", error);
              });
          })
          .catch((error) => {
            console.log("Error retrieving last Sujet IDs:", error);
          });
      })
      .catch((error) => {
        console.log("Error creating topics:", error);
      });
  }

  calculateStartTime(startHours, startMinutes, accumulatedMinutes) {
    const totalMinutes = startHours * 60 + startMinutes + accumulatedMinutes;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return hours.toString().padStart(2, "0") + ":" + minutes.toString().padStart(2, "0");
  }
  
  calculateFinishTime(startHours, startMinutes, accumulatedMinutes, duration) {
    const totalMinutes = startHours * 60 + startMinutes + accumulatedMinutes + duration;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return hours.toString().padStart(2, "0") + ":" + minutes.toString().padStart(2, "0");
  }
  
  

  saveMeeting() {
    this.teamService.getTeamMembers(this.selectedTeam.id).subscribe(
      (response) => {
        this.members = response.data;
      }
    );
    this.state = MeetingState.onHold;
  
    // Create the reunion object
    const reunion = {
      titre: this.title,
      etat: this.state,
      objective: this.objective,
      duree: this.duree,
      type: "planifie",
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
              date: null,
              heureDebut: null,
              heureFin: null
            };
  
            // Create the reunionurgente in the database
            this.reunionService.createReunionPlanifie(reunionUrgente).toPromise()
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
  
                this.insertSlotsIntoCreneauTable();
  
                
                // Create participations for each topic
                const participationPromises = this.participations.map((topic) => {
                  const participation = {
                    idCompte: topic.presenter,
                    idReunion: this.idReunion,
                    idSujet: topic.id,
                    heureDebut: null,
                    heureFin: null,
                    ordre: topic.ordre,
                    duree: topic.duree
                  };
                  return this.participationService.createParticipation(participation).toPromise();
                });
  
                // Execute the promises to create participations
                Promise.all(participationPromises)
                  .then(() => {
                    // Meeting, reunionurgente, participations, and votes are created successfully
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
                              const msg = "vous avez une participation du sujet dans la reunion :   " + this.title + "  veuillez consulter votre listes des réunions prévenus";
  
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