import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvtFavoriteListComponent } from './advt-favorite-list.component';

describe('AdvtFavoriteListComponent', () => {
  let component: AdvtFavoriteListComponent;
  let fixture: ComponentFixture<AdvtFavoriteListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvtFavoriteListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdvtFavoriteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
