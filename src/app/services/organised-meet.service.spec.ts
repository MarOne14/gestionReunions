import { TestBed } from '@angular/core/testing';

import { OrganisedMeetService } from './organised-meet.service';

describe('OrganisedMeetService', () => {
  let service: OrganisedMeetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrganisedMeetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
