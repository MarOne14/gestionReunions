import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Topic } from 'src/app/model/topic';
import { TopicService } from 'src/app/services/topic.service';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.css']
})
export class TopicComponent implements OnInit {
  @Input() topic: Topic;
  @Output() onDelete: EventEmitter<Topic> = new EventEmitter<Topic>();


  deleteTopic() {
    this.onDelete.emit(this.topic);
  }
  
  title: string;
  email: string;
  dur: number;
  det: string;
  form: FormGroup;
  
  constructor(private topicService: TopicService, private router: Router, private fb: FormBuilder ) {
    this.form = new FormGroup({
      title: new FormControl(),
      email: new FormControl(),
      dur: new FormControl(),
      det: new FormControl()
    });
  }

  ngOnInit() {
    this.form = new FormGroup({
      title : new FormControl('',[
        Validators.required,
        Validators.minLength(4),
        Validators.pattern('[a-zA-Z]*')
      ]),
      email : new FormControl('',[
        Validators.required,
        Validators.email
      ]),
      dur : new FormControl('',[
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(2)
      ]),
      det : new FormControl('',[
        Validators.required
      ]),
    })
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

    if (formControl.hasError('email')) {
      return 'Invalid email';
    }

    return '';
  }
}
