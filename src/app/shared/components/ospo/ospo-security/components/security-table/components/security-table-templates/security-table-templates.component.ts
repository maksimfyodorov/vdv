import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { SecurityTotal } from '../../../../types/security.types';

@Component({
  selector: 'app-security-table-templates',
  templateUrl: './security-table-templates.component.html',
  styleUrls: ['../../security-table.component.scss', './security-table-templates.component.scss'],
})
export class SecurityTableTemplatesComponent implements AfterViewChecked {
  @ViewChild('node') public nodeTemplate: TemplateRef<HTMLElement>;
  @ViewChild('summary') public summaryTemplate: TemplateRef<HTMLElement>;
  @ViewChild('state') public stateTemplate: TemplateRef<HTMLElement>;
  @ViewChild('stock') public stockTemplate: TemplateRef<HTMLElement>;
  @ViewChild('excess') public excessTemplate: TemplateRef<HTMLElement>;
  @ViewChild('lack') public lackTemplate: TemplateRef<HTMLElement>;
  @ViewChild('broken') public brokenTemplate: TemplateRef<HTMLElement>;
  @ViewChild('controls') public controlsTemplate: TemplateRef<HTMLElement>;
  @ViewChild('flight_summary') public flightSummaryTemplate: TemplateRef<HTMLElement>;
  @ViewChild('flight_total') public flightTotalTemplate: TemplateRef<HTMLElement>;
  @ViewChild('complete') public completedTemplate: TemplateRef<HTMLElement>;
  @ViewChild('not_complete') public notCompletedTemplate: TemplateRef<HTMLElement>;
  @ViewChild('choseViechle') public choseViechleTemplate: TemplateRef<HTMLElement>;

  @Output() public eventHandler: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }


  public ngAfterViewChecked(): void { }

  public getProgressValues(total: SecurityTotal): number {
    return ((total.stock + total.excess + total.broken) / total.state) * 100;
  }

  public getFlightProgressValues(total: any): number {
    return (total.completed / total.total) * 100;
  }

  public changeTechStatus(checked: boolean, data: any, condition: string): void {
    this.eventHandler.emit({ key: 'changeStatus', value: { checked, data, condition } });
  }

  public openTechModal(key: string, value: any): void {
    this.eventHandler.emit({ key, value });
  }

  public deleteTech(key: string, value: any): void {
    this.eventHandler.emit({ key, value });
  }

  public chooseTech(key: string, value: any) {
    this.eventHandler.emit({ key, value });
  }

}
