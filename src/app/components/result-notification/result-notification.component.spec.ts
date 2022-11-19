import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultNotificationComponent } from './result-notification.component';

describe('ResultNotificationComponent', () => {
  let component: ResultNotificationComponent;
  let fixture: ComponentFixture<ResultNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultNotificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
