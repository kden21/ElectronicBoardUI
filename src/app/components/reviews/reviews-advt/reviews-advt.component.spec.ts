import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewsAdvtComponent } from './reviews-advt.component';

describe('ReviewsAdvtComponent', () => {
  let component: ReviewsAdvtComponent;
  let fixture: ComponentFixture<ReviewsAdvtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewsAdvtComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewsAdvtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
