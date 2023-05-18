import { TestBed } from '@angular/core/testing';

import { ParticipationTopicService } from './participation-topic.service';

describe('ParticipationTopicService', () => {
  let service: ParticipationTopicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParticipationTopicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
