import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMeetOrgComponent } from './new-meet-org.component';

describe('NewMeetOrgComponent', () => {
  let component: NewMeetOrgComponent;
  let fixture: ComponentFixture<NewMeetOrgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewMeetOrgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewMeetOrgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
