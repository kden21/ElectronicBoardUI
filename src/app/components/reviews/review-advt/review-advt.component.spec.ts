import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewAdvtComponent } from './review-advt.component';

describe('ReviewAdvtComponent', () => {
  let component: ReviewAdvtComponent;
  let fixture: ComponentFixture<ReviewAdvtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewAdvtComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewAdvtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
