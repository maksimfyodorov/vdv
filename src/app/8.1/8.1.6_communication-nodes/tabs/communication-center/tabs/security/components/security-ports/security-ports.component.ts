import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Port } from '../../../../../../../../shared/components/ports/interfaces';
import { PORTS } from '../../../../../../../../shared/components/ports/Mock';

@Component({
  selector: 'app-security-ports',
  templateUrl: './security-ports.component.html',
  styleUrls: ['./security-ports.component.scss']
})
export class SecurityPortsComponent {
  @Input() public ports: Port[] = PORTS;
  @Output() public changed: EventEmitter<Port[]> = new EventEmitter<Port[]>();

  constructor() { }

  public addPort(): void {
    this.ports.push({} as Port);
  }

  public deletePort(port: Port): void {
    this.ports = this.ports.filter(item => item !== port);
  }

  public editComplete(): void {
    this.changed.emit(this.ports);
  }
}
