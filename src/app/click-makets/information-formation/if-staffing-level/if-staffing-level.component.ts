import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-if-staffing-level',
  templateUrl: './if-staffing-level.component.html',
  styleUrls: ['./if-staffing-level.component.scss']
})
export class IfStaffingLevelComponent implements OnInit {

  display1 = false;
  display2 = false;
  table = 1;
  visibleReport: boolean = false;
  visiblePosition: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  generateReport(): void {
    this.visibleReport = true;

    setTimeout(() => (this.visibleReport = false), 3000);
  }
}
