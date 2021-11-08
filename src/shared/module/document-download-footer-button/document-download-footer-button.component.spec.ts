import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentDownloadFooterButtonComponent } from './document-download-footer-button.component';

describe('DocumentDownloadFooterButtonComponent', () => {
  let component: DocumentDownloadFooterButtonComponent;
  let fixture: ComponentFixture<DocumentDownloadFooterButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentDownloadFooterButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentDownloadFooterButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
