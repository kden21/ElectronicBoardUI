import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvtCardComponent } from './advt-card.component';

describe('AdvtCardComponent', () => {
  let component: AdvtCardComponent;
  let fixture: ComponentFixture<AdvtCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvtCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdvtCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
