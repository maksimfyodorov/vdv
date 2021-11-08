import { Component, EventEmitter, forwardRef, Input, OnChanges, Output, ViewChild } from '@angular/core';
import { AutoComplete } from 'primeng/autocomplete';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-editable-autocomplete',
  templateUrl: './editable-autocomplete.component.html',
  styleUrls: ['./editable-autocomplete.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => EditableAutocompleteComponent),
    multi: true,
  }],
})
export class EditableAutocompleteComponent implements ControlValueAccessor {
  @ViewChild(AutoComplete) public autocomplete;
  @Input() public disabled = false;
  @Input() public disable = false;
  @Input() public canRemove = true;
  @Input() public canCreate = true;
  @Input() public canEdit = true;
  @Input() public set dataSource(value) {
    if (value) {
      this._dataSource = value;
      this.suggestions = this._dataSource
    }
  };
  @Input() public searchField: string;
  @Input() public displayField: string;
  @Input() public placeholder: string = 'Введите...';
  @Input() public set selectedSuggestion(value) {
    if (value) {
      this._selectedSuggestion = value;
      this.emitSelectSuggestion(this._selectedSuggestion);
    };
  }
  public get selectedSuggestion(): any {
    return this._selectedSuggestion;
  }
  private _selectedSuggestion: any;
  private _dataSource: any[];
  @Output() public selectSuggestion: EventEmitter<any> = new EventEmitter<any>();
  @Output() public editItem: EventEmitter<any> = new EventEmitter<any>();
  @Output() public deleteItem: EventEmitter<any> = new EventEmitter<any>();
  @Output() public createItem: EventEmitter<any> = new EventEmitter<any>();
  public query = '';
  public suggestions: any[] = [];



  public complete($event: { query: string; }): void {
    this.query = $event.query;
    if (this._dataSource) {
      this.suggestions = this._dataSource.filter(item => item[this.searchField].toLowerCase().includes($event.query.toLowerCase()));
    }
  }

  public emitSelectSuggestion(item: any): void {
    if (item) {
      this.selectSuggestion.emit(item);
      this.onChange(item)
    }
  }

  public emitEditItem(item: any): void {
    this.autocomplete.hide();
    this.editItem.emit(item);
  }

  public emitDeleteItem(item: any): void {
    this.autocomplete.hide();
    this.deleteItem.emit(item);
    this.autocomplete.inputEL.nativeElement.value = '';
  }

  public emitCreateItem(): void {
    this.createItem.emit(this.query);
    this.query = '';
  }

  public openDropdown(): void {
    this.autocomplete.handleDropdownClick(null);
  }

  public clearText(): void {
    this.selectedSuggestion = null;
    this.autocomplete.inputEL.nativeElement.value = '';
    this.query = ''
    this.autocomplete.hide();
  }

  public writeValue(outsideValue: any): void {
    this._selectedSuggestion = outsideValue
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  private onChange = (value: any) => {
  };

  private onTouched = () => {
  };

}
