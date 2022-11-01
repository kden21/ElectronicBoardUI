import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementActiveArchiveComponent } from './element-active-archive.component';

describe('ElementActiveArchiveComponent', () => {
  let component: ElementActiveArchiveComponent;
  let fixture: ComponentFixture<ElementActiveArchiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElementActiveArchiveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElementActiveArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
