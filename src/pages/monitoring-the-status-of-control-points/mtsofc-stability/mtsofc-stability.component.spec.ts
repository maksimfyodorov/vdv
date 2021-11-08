import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MtsofcStabilityComponent } from './mtsofc-stability.component';

describe('MtsofcStabilityComponent', () => {
  let component: MtsofcStabilityComponent;
  let fixture: ComponentFixture<MtsofcStabilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MtsofcStabilityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MtsofcStabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
