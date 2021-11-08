import { Component, forwardRef, Input, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { LoaderService } from '../../../../../../loader/loader.service';
import { AttachDocumentDialogService } from '../../../attach-document-dialog.service';
import { Subject, SubscriptionLike, timer } from 'rxjs';
import { debounce, filter } from 'rxjs/operators';
import { MilitaryUnitOption } from './types';

@Component({
  selector: 'app-military-unit-dropdown',
  templateUrl: './military-unit-dropdown.component.html',
  styleUrls: ['./military-unit-dropdown.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MilitaryUnitDropdownComponent),
      multi: true,
    },
    LoaderService,
  ],
})
export class MilitaryUnitDropdownComponent implements OnInit, OnDestroy, ControlValueAccessor {

  @Input()
  public set militaryUnitId(id: number) {
    if (typeof id === 'number') {
      this.defineMilitaryUnitById(id);
    }
  }

  public get militaryUnitId(): number {
    return this._militaryUnitId;
  }
  @Input()
  public options: MilitaryUnitOption[] = [];

  private _militaryUnitId: number;
  private queryChanged = new Subject<string>();
  private subQueryChanged: SubscriptionLike;

  constructor(
    private documentService: AttachDocumentDialogService,
    public loaderService: LoaderService,
  ) {
  }

  public ngOnInit(): void {
    this.subscribeQueryChanges();
  }

  public ngOnDestroy(): void {
    this.subQueryChanged.unsubscribe();
  }

  private subscribeQueryChanges(): void {
    this.subQueryChanged = this.queryChanged.pipe(
      filter((query) => query.length > 3),
      debounce(() => timer(1000)))
      .subscribe((res) => {
        this.getMilitaryUnitsByNumberName(res);
      });
  }

  public onChange(_: any): void {
  }

  public writeValue(militaryUnitId: any): void {
    this.clearSelectedData();
    this.militaryUnitId = militaryUnitId;
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
  }

  private getMilitaryUnitsByNumberName(name: string): void {
    this.loaderService.startLoading(this.documentService.getMilitaryUnitsByCommonName(name))
      .subscribe(response => {
        const unitsList = [];
        response.forEach(item => {
          unitsList.push({
            name: `${item.common_number_name} (${item.name})`,
            id: item.id,
          });
        });
        this.options = unitsList;
        if (this.options.length) {
          this.militaryUnitId = this.options[0].id;
        }
      });
  }

  public queryChange($event): void {
    if (typeof $event.value === 'string' && /^\d+$/.test($event.value)) {
      this.queryChanged.next($event.value);
    }
  }

  private defineMilitaryUnitById(id: number): void {
    if (this.options.length === 0) {
      this.documentService.getMilitaryUnitByID(id).subscribe(res => {
          this.options.push({
            name: `${res.common_number_name} (${res.name})`,
            id: res.id,
          });
          this._militaryUnitId = id;
          this.onChange(this._militaryUnitId);
        },
      );
    } else {
      this._militaryUnitId = id;
      this.onChange(this._militaryUnitId);
    }
  }

  private clearSelectedData(): void {
    this._militaryUnitId = null;
    this.options = [] as MilitaryUnitOption[];
  }
}
