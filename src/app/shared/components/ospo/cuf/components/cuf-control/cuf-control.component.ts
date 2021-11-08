import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CufServer, Host, HostTrigger, Status, TriggerI } from '../../interfaces/interfaces';
import { CufService } from '../../services/cuf.service';
import { FormArray, FormGroup } from '@angular/forms';
import { map } from 'rxjs/operators';
import { LoaderService } from '../../../../loader/loader.service';

@Component({
  selector: 'app-cuf-control',
  templateUrl: './cuf-control.component.html',
  styleUrls: ['./cuf-control.component.scss'],
})
export class CufControlComponent implements OnInit {

  get triggersFormArray(): FormArray {
    return this.cufForm.controls['triggers'] as FormArray;
  }

  get periodsFormArray(): FormArray {
    return this.cufForm.controls['periods'] as FormArray;
  }

  @Output() public onDeleteTrigger: EventEmitter<number> = new EventEmitter<number>();
  @Output() public onTriggerAdd: EventEmitter<void> = new EventEmitter<void>();
  @Output() public onPeriodAdd: EventEmitter<void> = new EventEmitter<void>();
  @Output() public onDeletePeriod: EventEmitter<number> = new EventEmitter<number>();
  @Input() public cufForm: FormGroup;
  public servers: CufServer[];
  public hosts: Host[] = [];
  public triggers: TriggerI[] = [];
  public hostTriggers: HostTrigger[] = [];
  public onTriggeredStatuses: Status[];

  constructor(private cufService: CufService, public loader: LoaderService) {
  }

  public ngOnInit(): void {
    this.getData();
  }

  public getHosts(cufServerId: string): void {
    this.loader.startLoading(this.cufService.getHosts(cufServerId).pipe(map(res => res.data.map(h => ({name: h.name, id: +h.id}))))).subscribe((res: Host[]) => {
      this.cufForm.get('host_id').enable();
      this.hosts = res;
    });
  }

  public getServerTriggers(hostId: number): void {
    this.loader.startLoading(this.cufService.getServerTriggers(hostId, this.cufForm.get('server_uuid').value).pipe(map(res => res.data)))
      .subscribe(res => this.hostTriggers = res);
  }

  public addTrigger(): void {
    this.onTriggerAdd.emit();
  }

  public addPeriod(): void {
    this.onPeriodAdd.emit();
  }

  private getServers(): void {
    this.loader.startLoading(this.cufService.getServers().pipe(map(res => res.data)))
      .subscribe(res => this.servers = this.cutServerUrlHttpPrefix(res));
  }

  public deleteTrigger(i: number): void {
    this.onDeleteTrigger.emit(i);
  }

  public removePeriod(i: number): void {
    this.onDeletePeriod.emit(i);
  }

  private getData(): void {
    this.getStatuses();
    this.getServers();
    if (this.cufForm.get('server_uuid')?.value) {
      this.getHosts(this.cufForm.get('server_uuid').value);
    }
    if (this.cufForm.get('host_id')?.value) {
      this.getServerTriggers(this.cufForm.get('host_id').value);
    }
  }

  private getStatuses(): void {
    this.loader.startLoading(this.cufService.getStatuses()
      .pipe(map(res => res.data), map(res => res.filter(status => status.name === 'Норма' || status.name === 'Авария'))))
      .subscribe(res => this.onTriggeredStatuses = res);
  }

  private cutServerUrlHttpPrefix(src: CufServer[]): CufServer[] {
    return src.map(item => {
      item.url = item.url.replace('http://', '');
      return item;
    });
  }

}
