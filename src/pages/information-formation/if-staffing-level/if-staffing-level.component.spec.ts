import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IfStaffingLevelComponent } from './if-staffing-level.component';

describe('IfStaffingLevelComponent', () => {
  let component: IfStaffingLevelComponent;
  let fixture: ComponentFixture<IfStaffingLevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IfStaffingLevelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IfStaffingLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
