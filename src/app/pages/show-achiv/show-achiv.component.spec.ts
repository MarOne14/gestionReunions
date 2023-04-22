import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAchivComponent } from './show-achiv.component';

describe('ShowAchivComponent', () => {
  let component: ShowAchivComponent;
  let fixture: ComponentFixture<ShowAchivComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowAchivComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowAchivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
