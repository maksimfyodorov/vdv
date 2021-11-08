import { Component, OnInit } from '@angular/core';
import { commanders, journalMock } from './types/journalMock';
import { MilitaryManEditDialogComponent } from '../dialogs/military-man-edit-dialog/military-man-edit-dialog.component';
import { militaryMen } from '../intercession-schedule/posts-schedule/mock';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-journal',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.scss'],
})
export class JournalComponent implements OnInit {

  values: any[] = journalMock;
  executivePerson = militaryMen;

  constructor(
    private dialogService: DialogService,
  ) {
  }

  ngOnInit(): void {
  }

  delete(journalEntry): void {
    if (journalEntry.isEdit) {
      journalEntry.isEdit = false;
    }
    journalEntry.interceded = null;
    journalEntry.comment = null;
  }

  editMilitaryMan(currentRecord): any {
    this.dialogService.open(MilitaryManEditDialogComponent, {
      header: 'Выберите военнослужащего',
      data: {
        allMilitaryMen: militaryMen,
      },
      closable: false,
    }).onClose.subscribe(result => {
      currentRecord.interceded = result;
      currentRecord.isEdit = true;
    });
  }

  intercede(journalEntry): void {
    journalEntry.interceded = journalEntry.shouldIntercede;
    journalEntry.isEdit = true;
  }

  save(journalEntry): void {
    journalEntry.isEdit = false;
    this.values[this.getJournalEntryIndex(journalEntry)] = {
      ...journalEntry,
      interceded: journalEntry.interceded,
      comment: journalEntry.comment,
    };
  }

  edit(journalEntry): void {
    journalEntry.isEdit = true;
  }

  getJournalEntryIndex(journalEntry): any {
    let journalEntryNumber;
    this.values.filter((value, index) => {
        if (value === journalEntry) {
          journalEntryNumber = index;
          return;
        }
      },
    );
    return journalEntryNumber;
  }

}
