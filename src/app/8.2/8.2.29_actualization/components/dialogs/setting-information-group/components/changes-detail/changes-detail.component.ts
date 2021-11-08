import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { PeriodValidators } from 'src/app/shared/components/period/periodValidators';
import { HttpService } from "../../http.service";
import { switchMap } from "rxjs/operators";
import { InformationGroup, SharedProperty, GroupMonth, GroupDayOfWeeks, GroupTypes2, Track } from "../../interfaces";
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-changes-detail',
  templateUrl: './changes-detail.component.html',
  styleUrls: ['./changes-detail.component.scss']
})
export class ChangesDetailComponent implements OnInit, OnDestroy {

  periodForm: FormGroup;

  @Output() onChanged = new EventEmitter<boolean>();

  @Input() edit: boolean;


  private _group: InformationGroup;
  get group() {
    return this._group;
  }
  @Input() set group(group: InformationGroup) {
    if (group) {
      this.selectedSectionGroup = group.section;
      this.selectedCharacterGroup = group.character;
      group.tracks = group.tracks.map(
        item => {

          let newItem: Track;
          if (item.type == 'Раз в месяц' || item.type == 'Раз в неделю' || item.type == 'Ежедневно' || item.type == 'Раз в год') {
            newItem = {
              ...item,
              day_of_week: GroupDayOfWeeks[item.day_of_week],
              month: GroupMonth[item.month],
              type: GroupTypes2[item.type],
            }

            if (!newItem.month) {
              delete newItem.month;
            }
            if (!newItem.day_of_week) {
              delete newItem.day_of_week;
            }
            return newItem;
          } else {
            return item;
          }

        }
      )
      this._group = group;
    }
  }

  _title = "План подготовки на учебный год";
  @Input()
  set title(item: string) {
    if (item) {
      this._title = item;
    }
  }
  get title() {
    return this._title;
  }

  getSectionsStream$: Observable<SharedProperty[]>;
  getCharectersStream$: Observable<SharedProperty[]>;

  sectionGroups: SharedProperty[] = [];
  selectedSectionGroup: SharedProperty;
  selectedSection: string

  subscriptions = new Subscription();

  characterGroups: SharedProperty[] = [];

  selectedFormGroup: SharedProperty;

  selectedCharacterGroup: SharedProperty;
  selectedChar: string;
  disableButton: boolean = false


  is_edit: boolean = false;
  is_edit2: boolean = false;
  is_edit3: boolean = false;

  constructor(private http: HttpService) { }

  ngOnInit(): void {
    if (this.edit) {
      this.initFormGroup()
      this.initStream()
    }

    if (!this.edit) {
      this.periodForm = new FormGroup({
        period: new FormArray([
          new FormControl({
            monthOfYear: null,
            day: null,
            time: '',
            type: '',
          }, PeriodValidators.filledPeriod),
        ]),
      });
      this.initStream()
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.selectedSectionGroup = null;
    this.selectedCharacterGroup = null;
    this.group = null;
    this.periodForm.reset();
  }



  addPeriodRecord(elem: Track = undefined): void {
    if (!elem) {
      (this.periodForm.get('period') as FormArray).push(new FormControl({
        monthOfYear: 1,
        day: 1,
        time: '06:00',
        type: 'yearly',
      }, PeriodValidators.filledPeriod)
      );
    }
    else {
      (this.periodForm.get('period') as FormArray).push(new FormControl({
        monthOfYear: elem?.month,
        day: Number(elem?.day),
        day_of_week: elem?.day_of_week,
        time: String(elem?.time),
        type: elem.type,
      }, PeriodValidators.filledPeriod)
      );
    }
  }

  removePeriodRecord(i: number): void {
    (this.periodForm.get('period') as FormArray).removeAt(i);
  }


  close(value: boolean): void {
    this.onChanged.emit(value);
  }

  selectInputItem(event: SharedProperty): void {
    this.selectedChar = event.uuid
  }

  selectInputItemSection(event: SharedProperty): void {
    this.selectedSection = event.uuid
  }

  addInputItem(event: string, inputType: string): void {
    switch (inputType) {
      case 'sectionGroups':
        this.subscriptions.add(
          this.http.createSection(event)
            .subscribe(
              res => {
                this.http.sectionStream$.next('');
              }
            ))
        break;
      case 'formGroups':
        break;
      case 'characterGroups':
        this.subscriptions.add(
          this.http.createCharacter(event)
            .subscribe(
              res => {
                this.http.characterStream$.next('');
              }
            ))
        break;
      default:
        alert("Нет таких значений");
    };
  }

  editInputItem(event: SharedProperty, inputType: string): void {
    let valueEditInput: any;
    switch (inputType) {
      case 'sectionGroups':
        this.selectedSectionGroup = event;
        this.is_edit = true;
        break;
      case 'formGroups':
        this.selectedFormGroup = event;
        this.is_edit2 = true;
        break;
      case 'characterGroups':
        this.selectedCharacterGroup = event;
        this.is_edit3 = true;
        break;
      default:
        alert("Нет таких значений");
    };
  }

  deleteInputItem(event: SharedProperty, inputType: string): void {
    switch (inputType) {
      case 'sectionGroups':
        this.subscriptions.add(
          this.http.deleteSection(event)
            .subscribe(
              res => {
                this.http.sectionStream$.next('');
                this.selectedSectionGroup = this.sectionGroups[0];
              }
            ))
        break;
      case 'formGroups':

        break;
      case 'characterGroups':
        this.subscriptions.add(
          this.http.deleteCharacter(event)
            .subscribe(
              res => {
                this.http.characterStream$.next('');
                this.selectedCharacterGroup = this.characterGroups[0];
              }
            ))
        break;
      default:
        alert("Нет таких значений");
    };
  }

  save(): void {
    if (this.periodForm.valid &&
      this.group.name.length &&
      this.group.number.length &&
      this.group.forms.length &&
      this.selectedSection.length &&
      this.selectedChar.length
    ) {
      let arr: Track[] = [];
      arr = this.makeArrayOfPeriods();
      this.disableButton = true;

      let formsIds = this.group.forms.map(
        elem => {
          return elem.uuid;
        }
      )
      let resultObj = {
        number: this.group.number,
        name: this.group.name,
        section_uuid: this.group.section.uuid,
        character_uuid: this.group.character.uuid,
        forms: formsIds,
        tracks: arr,
      };
      if (this.edit) {
        this.subscriptions.add(
          this.http.editInformationGroup(this.group.uuid, resultObj).subscribe(
            res => {
              this.disableButton = false;
              this.http.refreshStream$.next('');
              this.close(true);
            },
            err => {
              this.disableButton = false;
              alert('Ошибка')
            }
          ))
      }
      if (!this.edit) {
        resultObj = {
          ...resultObj,
          section_uuid: this.selectedSection,
          character_uuid: this.selectedChar,
        };
        this.subscriptions.add(
          this.http.makeInformationGroup(resultObj).subscribe(
            res => {
              this.disableButton = false;
              this.http.refreshStream$.next('');
              this.close(true);
            },
            err => {
              this.disableButton = false;
              alert('Ошибка')
            }
          ))
      }
    }
    else {
      alert('Заполните все поля')
      return null
    }
  }

  makeArrayOfPeriods(): Track[] {
    let arr: Track[] = []
    this.periodForm.controls.period.value.forEach(element => {
      if (element.type == "weekly") {
        arr.push({
          day_of_week: element.day_of_week,
          time: element.time,
          type: "weekly"
        })
      }
      if (element.type == "monthly") {
        arr.push({
          day: element.day,
          time: element.time,
          type: "monthly"
        })
      }
      if (element.type == "yearly") {
        arr.push({
          day: element.day,
          time: element.time,
          month: element.monthOfYear,
          type: "yearly"
        })
      }
      if (element.type == "daily") {
        arr.push({
          time: element.time,
          type: "daily"
        })
      }
    });
    return arr
  }

  saveEditableItem(inputType: string): void {
    switch (inputType) {
      case 'sectionGroups':
        this.subscriptions.add(
          this.http.editSection(this.selectedSectionGroup)
            .subscribe(
              res => {
                this.selectedSectionGroup = res;
                this.http.sectionStream$.next('');
              }
            ))
        this.is_edit = false;
        break;
      case 'formGroups':
        this.is_edit2 = false;
        break;
      case 'characterGroups':
        this.subscriptions.add(
          this.http.editCharacter(this.selectedCharacterGroup)
            .subscribe(
              res => {
                this.selectedCharacterGroup = res;
                this.http.characterStream$.next('');
              }
            ))
        this.is_edit3 = false;
        break;
      default:
        alert("Нет таких значений");
    };
  }

  setValueInfGroupForm(event: SharedProperty[]): void {
    this.group.forms = event;
  }

  initFormGroup(): void {
    this.periodForm = new FormGroup({
      period: new FormArray([]),
    });
    this.group.tracks.forEach(elem => {
      this.addPeriodRecord(elem)
    })
  }

  initStream(): void {
    this.getSectionsStream$ = this.http.getSections();
    this.http.sectionStream$.pipe(
      switchMap(res => this.getSectionsStream$)
    )
      .subscribe(
        (item: SharedProperty[]) => {
          this.sectionGroups = item;
        }
      )

    this.getCharectersStream$ = this.http.getCharacters();

    this.http.characterStream$.pipe(
      switchMap(res => this.getCharectersStream$)
    )
      .subscribe(
        (item: SharedProperty[]) => {
          this.characterGroups = item;
        }
      )
  }

}
