import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvtAddCardComponent } from './advt-add-card.component';

describe('AdvtAddCardComponent', () => {
  let component: AdvtAddCardComponent;
  let fixture: ComponentFixture<AdvtAddCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvtAddCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdvtAddCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
