import { Component, OnDestroy, OnInit } from '@angular/core';
import { Document, DocumentsByGroup } from '../../shared/components/ospo/documents/documents.types';
import { DOCUMENTS, DOCUMENTS_BY_GROUP } from './mock';
import { codeMultiple } from './code-examples/documents';
import { DialogService } from 'primeng/dynamicdialog';
import { MilitaryUnitsModalComponent } from '../../shared/components/ospo/military-units/military-units-modal/military-units-modal.component';
import { takeWhile } from 'rxjs/operators';
import { FormControl, FormGroup } from '@angular/forms';
import { SubscriptionLike } from 'rxjs';
import { CufComponent } from '../../shared/components/ospo/cuf/cuf.component';
import { AttachDocumentDialogComponent } from '../../shared/components/ospo/documents/attach-document-dialog/attach-document-dialog.component';
import { OspoChangeHistoryComponent } from '../../shared/components/ospo/ospo-change-history/ospo-change-history.component';
import { NotificationService } from '../../shared/components/ospo/notification/services/notification.service';

@Component({
  selector: 'app-examples',
  templateUrl: './examples.component.html',
  styleUrls: ['./examples.component.scss'],
})
export class ExamplesComponent implements OnInit, OnDestroy {

  public documents: Document[] = DOCUMENTS;
  public documentsByGroup: DocumentsByGroup[] = DOCUMENTS_BY_GROUP;

  public documentsCodeMultiple = codeMultiple;

  public mUForm: FormGroup;
  private subMuForm: SubscriptionLike;

  public selectedMilitaryUnit = {
    id: 17574,
    label: 'упр, в/ч 58263',
  };

  constructor(
    public dialogService: DialogService,
    private notificationService: NotificationService) {
  }

  ngOnInit(): void {
    this.mUForm = new FormGroup({
      militaryUnit: new FormControl(),
      militaryDivision: new FormControl(),
    });
    this.subMuForm = this.mUForm.valueChanges.subscribe(res => {
    });
  }

  ngOnDestroy(): void {
    this.subMuForm.unsubscribe();
  }

  public openMilitaryUnits(): void {
    this.dialogService.open(MilitaryUnitsModalComponent, {
      header: 'Воиские формирования',
      data: {
        mode: 'multiple',
      },
    }).onClose.pipe(takeWhile(res => res)).subscribe(res => console.log(res));
  }

  public openCuf(): void {
    this.dialogService.open(CufComponent, {
      header: 'CUF',
      data: {
        periods: [
          {
            time: '10:10',
            type: 'monthly',
            uuid: 'c54ffbe5-43d6-4fa5-8c1c-74a2f968773b',
          },
        ],
        server_uuid: '1d819fb8-740d-44f1-9771-d34171584f30',
        message: 'Text',
        uuid: '33206c96-a879-4082-a368-3d6fba25ecea',
        triggers: [
          {
            status: {
              name: 'Авария',
              uuid: 'f381088d-a6dd-43ec-8152-392cd6362690',
            },
            trigger_id: '24686',
            auto_report: true,
            uuid: 'f7e937b2-2a35-4ccc-9386-49a5c700b00a',
          },
        ],
        host_id: 10625,
        server: {
          uuid: '1d819fb8-740d-44f1-9771-d34171584f30',
          url: 'http://1cuf-vm01.int.aorti.tech',
        },
      },
    });
  }

  public onSelectMilitaryUnit(militaryUnit: unknown): void {
    console.log(militaryUnit);
  }

  public openAttachDocuments(): void {
    this.dialogService.open(AttachDocumentDialogComponent, {
      header: 'Добавление документов',
      data: {
        selectedDocuments: {
          military_unit: '1141',
          uuid: 'ca6c9b25-7eb3-4b6e-961a-8fbe759c1257',
          number: '10',
          user: {
            full_name: 'Иванов Иван Петрович',
            id: 'c8359722-283a-47b7-ad89-8a17e10f0cea',
            username: 'kvdv01',
          },
          name: 'Тест10',
          created_at: '07.06.2021',
          group: 'ИРЗ 8.1.5',
          files: [],
          date: '07.06.2021',
          kind: 'Приказ',
        },
        attachMode: 'single',
      },
    }).onClose.subscribe(res => console.log(res));
  }

  public openCameraHistory(): void {
    this.dialogService.open(OspoChangeHistoryComponent, {
      header: 'История изменения статуса камеры',
      width: '1005px',
    });
  }

  public showToast(): void {
    console.log('message');
    const date = new Date();
    this.notificationService.invoke({
      title: 'title',
      description: 'description',
      date: date.toLocaleDateString(),
      link: {
        type: 'тип',
        first_link_uuid: '',
        second_link_uuid: '',
      },
    });
  }
}
