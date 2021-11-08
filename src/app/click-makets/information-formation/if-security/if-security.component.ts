import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-if-security',
  templateUrl: './if-security.component.html',
  styleUrls: ['./if-security.component.scss'],
})
export class IfSecurityComponent implements OnInit {
  display1 = false;
  display2 = false;
  table = 1;

  additingTechnic: boolean = false;
  editableTechnic: boolean = false;

  generatedReport: boolean = false;
  visibleViewDocuments: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  generateReport(): void {
    this.generatedReport = true;

    setTimeout(() => (this.generatedReport = false), 3000);
  }
}
