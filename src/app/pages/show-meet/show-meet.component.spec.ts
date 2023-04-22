import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowMeetComponent } from './show-meet.component';

describe('ShowMeetComponent', () => {
  let component: ShowMeetComponent;
  let fixture: ComponentFixture<ShowMeetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowMeetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowMeetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
