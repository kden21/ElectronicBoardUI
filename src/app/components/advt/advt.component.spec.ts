import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvtComponent } from './advt.component';

describe('AdvtComponent', () => {
  let component: AdvtComponent;
  let fixture: ComponentFixture<AdvtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvtComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdvtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
