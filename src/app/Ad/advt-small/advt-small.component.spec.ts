import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvtSmallComponent } from './advt-small.component';

describe('AdvtSmallComponent', () => {
  let component: AdvtSmallComponent;
  let fixture: ComponentFixture<AdvtSmallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvtSmallComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdvtSmallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
