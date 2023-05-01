import { Component, Input } from '@angular/core';
import { Topic } from 'src/app/model/topic';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.css']
})
export class TopicComponent {
  @Input() topic: Topic;
}
