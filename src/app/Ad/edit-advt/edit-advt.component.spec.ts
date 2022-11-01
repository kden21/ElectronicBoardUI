import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAdvtComponent } from './edit-advt.component';

describe('EditAdvtComponent', () => {
  let component: EditAdvtComponent;
  let fixture: ComponentFixture<EditAdvtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAdvtComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditAdvtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
