import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageMeetComponent } from './manage-meet.component';

describe('ManageMeetComponent', () => {
  let component: ManageMeetComponent;
  let fixture: ComponentFixture<ManageMeetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageMeetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageMeetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
