import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMeetUrgComponent } from './new-meet-urg.component';

describe('NewMeetUrgComponent', () => {
  let component: NewMeetUrgComponent;
  let fixture: ComponentFixture<NewMeetUrgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewMeetUrgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewMeetUrgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
