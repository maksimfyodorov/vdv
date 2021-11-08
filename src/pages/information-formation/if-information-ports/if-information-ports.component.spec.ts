import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IfInformationPortsComponent } from './if-information-ports.component';

describe('IfInformationPortsComponent', () => {
  let component: IfInformationPortsComponent;
  let fixture: ComponentFixture<IfInformationPortsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IfInformationPortsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IfInformationPortsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
