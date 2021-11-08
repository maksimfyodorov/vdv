import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IfNodesComponent } from './if-nodes.component';

describe('IfNodesComponent', () => {
  let component: IfNodesComponent;
  let fixture: ComponentFixture<IfNodesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IfNodesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IfNodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
