import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { Port } from './interfaces';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { PortService } from './servises/port.service';

@Component({
  selector: 'app-ports',
  templateUrl: './ports.component.html',
  styleUrls: ['./ports.component.scss'],
  providers: [PortService, {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => PortsComponent),
    multi: true,
  }],
})
export class PortsComponent implements OnInit, ControlValueAccessor {

  @Input() public showAddPortButton = true;
  @Input() public showPortSelect = false;

  public ports: Port[] = [];
  private clonedPorts: { [s: string]: Port; } = {};

  constructor(private portService: PortService) {
  }

  public ngOnInit(): void {
  }

  public onPortEditInit(port: Port): void {
    this.clonedPorts[port.uuid] = { ...port };
  }

  public onPortEditSave(port: Port): void {
    if (port.uuid === undefined) {
      this.portService.postPort(port).subscribe(() => {
        delete this.clonedPorts[port.uuid];
      });
    } else {
      this.portService.patchPort(port).subscribe(() => {
        delete this.clonedPorts[port.uuid];
      });
    }
  }

  public onPortEditCancel(port: Port, index: number): void {
    this.ports[index] = this.clonedPorts[port.uuid];
    delete this.clonedPorts[port.uuid];
  }

  public onDeletePort(port: Port, rowIndex: number): void {
    if (port.uuid) {
      this.portService.deletePort(port).subscribe(() => {
        this.ports = this.ports.filter(item => item.uuid !== port.uuid);
      });
    } else {
      this.ports.splice(rowIndex, 1);
    }
  }

  public onAddPort(): void {
    this.ports.push({} as Port);
  }

  public registerOnChange(fn): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn): void {
    this.onTouched = fn;
  }

  public writeValue(outsideValue: Port[]): void {
    this.ports = outsideValue;
  }

  public updateValue(insideValue: Port[]): void {
    this.onChange(insideValue);
    this.onTouched();
  }

  private onChange = (ports: Port[]) => {
  }

  private onTouched = () => {
  }
}
