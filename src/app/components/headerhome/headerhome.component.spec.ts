import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderhomeComponent } from './headerhome.component';

describe('HeaderhomeComponent', () => {
  let component: HeaderhomeComponent;
  let fixture: ComponentFixture<HeaderhomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderhomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
