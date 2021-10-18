import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrivePopupComponent } from './drive-popup.component';

describe('DrivePopupComponent', () => {
  let component: DrivePopupComponent;
  let fixture: ComponentFixture<DrivePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrivePopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DrivePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
