import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-if-information-ports',
  templateUrl: './if-information-ports.component.html',
  styleUrls: ['./if-information-ports.component.scss']
})
export class IfInformationPortsComponent implements OnInit {

  display1 = false;
  display2: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

}
