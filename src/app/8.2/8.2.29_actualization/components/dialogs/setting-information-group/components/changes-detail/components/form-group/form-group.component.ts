import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from "rxjs";
import { switchMap } from "rxjs/operators";
import { HttpService } from "../../../../http.service";
import { SharedProperty } from "../../../../interfaces";
@Component({
  selector: 'app-form-group',
  templateUrl: './form-group.component.html',
  styleUrls: ['./form-group.component.scss']
})
export class FormGroupComponent implements OnInit, OnDestroy {

  private _values: SharedProperty[];
  isShow = false;
  @Input() set values(val: SharedProperty[]) {
    this._values = val;
  };
  get values() {
    return this._values;
  }

  @Output() onChangedValue = new EventEmitter<SharedProperty[]>()

  subscriptions = new Subscription();

  forms: SharedProperty[];
  searchValue: string;
  isNotFound = false;
  isEditMode = false;
  editValue: SharedProperty;
  editValue1: string;

  getForms$: Observable<SharedProperty[]>;
  createFormStream$;
  editFormStream$;
  deleteForm$;
  formStream$ = new BehaviorSubject('')


  constructor(private http: HttpService) { }

  ngOnInit(): void {
    this.getForms$ = this.http.getForms();

    this.subscriptions.add(
      this.formStream$.pipe(
        switchMap(val => this.getForms$)
      ).subscribe(
        (res: SharedProperty[]) => {
          this.forms = res;
        }
      )
    )

  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  deleteItem(form): void {
    this.values = this.values.filter(item => item.name != form.name);
    this.onChangedValue.emit(this.values);
  }

  showPopUp(event): void {
    this.isShow = !this.isShow;
  }

  search(event): void {
    let arr = [];

    let arr1 = this.forms.reduce((acc, cur) => {
      acc.push({ ...cur });
      return acc;
    }, [])

    for (let i = 0; i < arr1.length; i++) {
      arr1[i].name = arr1[i].name.toLowerCase();

      if (~arr1[i].name.indexOf(event)) {
        arr.push(this.forms[i])
      }
    }
    if (arr.length == 0) {
      this.isNotFound = true;
      this.formStream$.next('');
      return;
    }
    if (arr.length > 0) {
      this.isNotFound = false;
      this.forms = arr;
    } else {
      this.isNotFound = false;
      this.formStream$.next('');
    }

    if (event == '') {
      this.formStream$.next('');
    }

  }

  createItemMenu(event): void {
    this.subscriptions.add(
      this.createFormStream$ = this.http.createForm(this.searchValue).subscribe(
        (res: SharedProperty) => {
          this.isNotFound = false;
          this.isShow = false;
          this.searchValue = '';
          this.formStream$.next('')
        }
      )
    )
  }

  selectItemMenu(form): void {
    let result = this.values.find(item => item.name === form.name);
    if (!result) {
      this.values.push(form);
      this.onChangedValue.emit(this.values);
    }
    this.isShow = false;
  }

  deleteItemMenu(form): void {
    this.subscriptions.add(
      this.deleteForm$ = this.http.deleteForm(form).subscribe(
        (res: SharedProperty) => {
          let result = this.values.find(item => item.name === form.name);
          if (result) {
            this.values = this.values.filter(item => item.name != form.name);
            this.onChangedValue.emit(this.values);
          }
          this.isNotFound = false;
          this.isShow = false;
          this.formStream$.next('');
        }
      )
    )
  }

  showEditDialog(form): void {
    this.editValue = form;
    this.editValue1 = form.name;
    this.isEditMode = true;
    this.isShow = false;
  }

  editItemMenu(e): void {
    this.isEditMode = false;
    this.subscriptions.add(
      this.editFormStream$ = this.http.editForm(this.editValue).subscribe(
        (res: SharedProperty) => {
          this.formStream$.next('');
        }
      ))
  }
}
