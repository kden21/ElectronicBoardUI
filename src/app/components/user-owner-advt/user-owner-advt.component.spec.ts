import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserOwnerAdvtComponent } from './user-owner-advt.component';

describe('UserOwnerAdvtComponent', () => {
  let component: UserOwnerAdvtComponent;
  let fixture: ComponentFixture<UserOwnerAdvtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserOwnerAdvtComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserOwnerAdvtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
