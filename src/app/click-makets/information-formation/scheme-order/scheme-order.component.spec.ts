import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchemeOrderComponent } from './scheme-order.component';

describe('SchemeOrderComponent', () => {
  let component: SchemeOrderComponent;
  let fixture: ComponentFixture<SchemeOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchemeOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchemeOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
