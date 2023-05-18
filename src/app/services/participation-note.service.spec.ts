import { TestBed } from '@angular/core/testing';

import { ParticipationNoteService } from './participation-note.service';

describe('ParticipationNoteService', () => {
  let service: ParticipationNoteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParticipationNoteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
