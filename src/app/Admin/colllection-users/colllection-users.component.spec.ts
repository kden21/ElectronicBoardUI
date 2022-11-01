import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColllectionUsersComponent } from './colllection-users.component';

describe('ColllectionUsersComponent', () => {
  let component: ColllectionUsersComponent;
  let fixture: ComponentFixture<ColllectionUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColllectionUsersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColllectionUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
