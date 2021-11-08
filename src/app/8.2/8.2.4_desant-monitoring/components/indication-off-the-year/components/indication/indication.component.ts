import { ReportsDialogComponent } from './../../../../../../shared/components/ospo/reports-dialog/reports-dialog/reports-dialog.component';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { Document } from '../../../../../../shared/components/ospo/documents/documents.types';


@Component({
  selector: 'app-indication',
  templateUrl: './indication.component.html',
  styleUrls: ['./indication.component.scss'],
})
export class IndicationComponent implements OnInit {

  constructor(public dialogService: DialogService) { }

  @Output() emitDeleteIndication: EventEmitter<string> = new EventEmitter();
  @Output() documentsToShowByGroup;
  @Input() public indicationIndex: number;
  public selectedReport;
  public documents: Document[] = [];
  public title = 'Шаблоны отчетов: Подготовительные мероприятия';

  ngOnInit(): void { }

  show(): void {
    const ref = this.dialogService.open(ReportsDialogComponent, {
      header: this.title,
      width: '1066px',
      dismissableMask: true,
    }).onClose.subscribe(res => {
      this.selectedReport = res;
    });
  }

  public deleteIndication(): void {
    this.emitDeleteIndication.emit();
  }
}
