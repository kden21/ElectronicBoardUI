import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvtReportCardComponent } from './advt-report-card.component';

describe('AdvtReportCardComponent', () => {
  let component: AdvtReportCardComponent;
  let fixture: ComponentFixture<AdvtReportCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvtReportCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdvtReportCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
