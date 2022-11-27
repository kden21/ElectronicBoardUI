import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPhotoAdvtComponent } from './show-photo-advt.component';

describe('ShowPhotoAdvtComponent', () => {
  let component: ShowPhotoAdvtComponent;
  let fixture: ComponentFixture<ShowPhotoAdvtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowPhotoAdvtComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowPhotoAdvtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
