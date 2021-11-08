import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { VvstSample } from '../../../../../../interfaces/interface';
import { BchsService } from '../../../../../services/bchs.service';
import { CounterListService } from '../../../../../services/counter-list.service';

@Component({
  selector: 'app-military-transport-dialog',
  templateUrl: './military-transport-dialog.component.html',
  styleUrls: ['./military-transport-dialog.component.scss']
})
export class MilitaryTransportDialogComponent implements OnInit, AfterViewInit {

  public tableDataSource: VvstSample[];
  public chosenTech: VvstSample[] = [];
  public id: string;
  public militaryItemId: string;

  constructor(
    public dialogRef: DynamicDialogRef,
    private changeDetectorRef: ChangeDetectorRef,
    private bchsService: BchsService,
    private http: CounterListService,
    private dynamicDialogConfig: DynamicDialogConfig,
  ) {
    this.id = this.http.getQueryId();
    this.militaryItemId = this.http.getQueryMilitaryItemId();
  }

  public ngOnInit(): void {
    this.getFixions();
  }

  public getFixions(): void {
    this.bchsService.getFixtions(this.militaryItemId).subscribe(res => {
      this.tableDataSource = res;
      this.dynamicDialogConfig?.data?.selectedPerson?.data.forEach(element => {
        const tech = this.tableDataSource.find(r => r.uuid === element.vvst.uuid)
        this.chosenTech.push(tech);
      });
    })
  }

  public ngAfterViewInit(): void {
    this.changeDetectorRef.detectChanges();
  }

  public ngOnDestroy(): void {
    this.sendData();
  }

  public sendData(): void {
    this.dialogRef.close(this.chosenTech);
  }

}
