import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraversalWrapperComponent } from './traversal-wrapper.component';

describe('TraversalWrapperComponent', () => {
  let component: TraversalWrapperComponent;
  let fixture: ComponentFixture<TraversalWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TraversalWrapperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TraversalWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
