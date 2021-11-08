import { Component, OnDestroy, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { AccordionModalDataComponent } from './accordion-modal-data/accordion-modal-data.component';

@Component({
  selector: 'app-show-accordion-data',
  templateUrl: './show-accordion-data.component.html',
  styleUrls: ['./show-accordion-data.component.scss']
})
export class ShowAccordionDataComponent implements OnInit, OnDestroy {

  constructor(
    private dialog: DialogService,
  ) { }

  public ngOnInit(): void {
    this.dialog.open(AccordionModalDataComponent, {
      header: `Контроль работы`,
    }).onClose.subscribe(() => this.ngOnDestroy())
  }

  public ngOnDestroy(): void { }

}
