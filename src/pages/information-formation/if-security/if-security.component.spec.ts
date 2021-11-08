import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IfSecurityComponent } from './if-security.component';

describe('IfSecurityComponent', () => {
  let component: IfSecurityComponent;
  let fixture: ComponentFixture<IfSecurityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IfSecurityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IfSecurityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
