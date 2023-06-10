import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Topic } from 'src/app/model/topic';
import { TeamService } from 'src/app/services/team.service';
import { TopicService } from 'src/app/services/topic.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.css']
})
export class TopicComponent implements OnInit {
  @Input() topic: Topic;
  @Output() onDelete: EventEmitter<Topic> = new EventEmitter<Topic>();
  topics: Topic[] = [];
  selectedTopic: Topic; 

  deleteTopic() {
    this.onDelete.emit(this.topic);
  }
  
  title: string;
  email: any;
  dur: number;
  det: string;
  form: FormGroup;
  members: any[];
  id : number;
  selectedMember : any;
  idPresenter : number;
  
  constructor(private topicService: TopicService, 
    private fb: FormBuilder, 
    private teamService : TeamService,
    ) {
    this.form = new FormGroup({
      title: new FormControl(),
      dur: new FormControl(),
      det: new FormControl()
    });
    this.email=localStorage.getItem("userId");
    this.id = this.teamService.getTeamId();
    this.teamService.getTeamMembers(this.id).subscribe(
      (Response)=>{
        this.members = Response.data;
      }
    );
  }

  memberSelected(): void {
    this.topic.presenter=this.selectedMember.nom_utilisateur;
  }

  private searchTitleSubject = new Subject<string>();

  ngOnInit() {
    this.searchTitleSubject
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((title: string) => this.topicService.getSujetsByTitle(title))
      )
      .subscribe((topics: any[]) => {
        this.topics = topics;
      });
  }  

  onTitleInput(title: string) {
    this.topicService.getSujetsByTitle(this.topic.title).subscribe((response: Topic[]) => {
      if(response.length>0){
      this.topics = response;
      this.topic.details=this.topics[0].details;
      this.topic.id=this.topics[0].id;
      }
      else{
        this.topic.details="";
        this.topic.id=0;
      }
    });
  }    

  selectTopic(topic: Topic) {
    this.selectedTopic = topic;
    this.topic.title = topic.title;
    this.topic.details = topic.details;
    this.topic.presenter = this.selectedMember.nom_utilisateur;
  }

  capsLockWarning: boolean = false;
  
  onKeyUp(event: KeyboardEvent) {
    const capsOn = event.getModifierState('CapsLock');
    this.capsLockWarning = capsOn;
  }
  
  getErrorMessage(formControlName: string) {
    const formControl = this.form.get(formControlName);
    if (!formControl) return '';

    if (formControl.hasError('required')) {
      return 'This field is required';
    }

    if (formControl.hasError('minlength')) {
      return `Minimum length should be ${formControl.errors?.['minlength'].requiredLength}`;
    }

    if (formControl.hasError('maxlength')) {
      return `Maximum length should be ${formControl.errors?.['maxlength'].requiredLength}`;
    }

    if (formControl.hasError('pattern')) {
      return 'Invalid input';
    }

    return '';
  }
}
