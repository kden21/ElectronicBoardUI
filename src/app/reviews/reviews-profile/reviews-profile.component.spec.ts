import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewsProfileComponent } from './reviews-profile.component';

describe('ReviewsProfileComponent', () => {
  let component: ReviewsProfileComponent;
  let fixture: ComponentFixture<ReviewsProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewsProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewsProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
