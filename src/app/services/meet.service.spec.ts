import { TestBed } from '@angular/core/testing';

import { MeetService } from './urgentMeet.service';

describe('MeetService', () => {
  let service: MeetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MeetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
