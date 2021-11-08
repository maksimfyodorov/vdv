import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { PlanHistory } from '../../../interfaces/interface';
import { EventTableService } from '../../../services/event-table.service';

@Component({
  selector: 'app-history-modal',
  templateUrl: './history-modal.component.html',
  styleUrls: ['./history-modal.component.scss']
})
export class HistoryModalComponent implements OnInit {

  public history: PlanHistory[]

  constructor(
    public httpService: EventTableService,
    public config: DynamicDialogConfig,
  ) { }

  public ngOnInit(): void {
    this.getHistoryData(this.config.data.uuid);
  }

  public getHistoryData(planUuid: string): void {
    this.httpService.getPlanHistory(planUuid).subscribe(history => this.history = history)
  }
}
