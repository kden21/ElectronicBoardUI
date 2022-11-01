import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvtPageComponent } from './advt-page.component';

describe('AdvtPageComponent', () => {
  let component: AdvtPageComponent;
  let fixture: ComponentFixture<AdvtPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvtPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdvtPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
