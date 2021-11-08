import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-if-security',
  templateUrl: './if-security.component.html',
  styleUrls: ['./if-security.component.scss']
})
export class IfSecurityComponent implements OnInit {

  display1 = false;
  display2 = false;
  table = 1;
  constructor() { }

  ngOnInit(): void {
  }

}
