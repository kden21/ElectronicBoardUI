import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserReportCardComponent } from './user-report-card.component';

describe('ReportComponent', () => {
  let component: UserReportCardComponent;
  let fixture: ComponentFixture<UserReportCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserReportCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserReportCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
