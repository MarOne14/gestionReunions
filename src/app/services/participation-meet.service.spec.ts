import { TestBed } from '@angular/core/testing';

import { ParticipationMeetService } from './participation-meet.service';

describe('ParticipationMeetService', () => {
  let service: ParticipationMeetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParticipationMeetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
