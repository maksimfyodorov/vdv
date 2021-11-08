import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-document-download-footer-button',
  templateUrl: './document-download-footer-button.component.html',
  styleUrls: ['./document-download-footer-button.component.scss']
})
export class DocumentDownloadFooterButtonComponent implements OnInit {

  @Input() url: string;
  constructor() { }

  ngOnInit(): void {
  }

}
