import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvtReportsComponent } from './advt-reports.component';

describe('AdvtReportsComponent', () => {
  let component: AdvtReportsComponent;
  let fixture: ComponentFixture<AdvtReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvtReportsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdvtReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
