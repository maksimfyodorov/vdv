import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CreateEditChannelDialogService } from './create-edit-channel-dialog.service';
import { Channel, ChannelStatus, ChannelType, Mode } from '../../../nodes-scheme/nodes.scheme.types';
import { PromptDialogComponent } from '../../../../../../../../shared/components/prompt-dialog/prompt-dialog.component';
import { mergeMap, takeWhile } from 'rxjs/operators';
import { ConfirmationDialogComponent } from '../../../../../../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { NodesSchemeService } from '../../../nodes-scheme/services/nodes-scheme.service';
import { Document } from '../../../../../../../../shared/components/ospo/documents/documents.types';

@Component({
  selector: 'app-create-edit-channel-dialog',
  templateUrl: './create-edit-channel-dialog.component.html',
  styleUrls: ['./create-edit-channel-dialog.component.scss'],
  providers: [CreateEditChannelDialogService],
})
export class CreateEditChannelDialogComponent implements OnInit {
  public channelForm: FormGroup;
  public mode: Mode = 'create';
  public channel_types: ChannelType[] = [];
  public selectedType: ChannelType;
  public channelStatuses: ChannelStatus[];

  constructor(
    private dialogRef: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private channelService: CreateEditChannelDialogService,
    private nodeService: NodesSchemeService,
    private dialogService: DialogService
  ) {}

  public ngOnInit(): void {
    this.checkMode();
    this.getChannelTypes();
    this.createChannelForm();
    this.getChannelStatuses();
    this.fillForm(this.config.data);
    this.listenToChannelFormControls();
  }

  public cancelDialog(): void {
    this.dialogRef.close();
  }

  public deleteChannel(): void {
    this.dialogRef.close('delete');
  }

  public saveChannel(): void {
    this.dialogRef.close(this.channelForm.value);
  }

  public selectType($event: ChannelType): void {
    this.channelForm.get('channel_type').setValue($event);
  }

  public createType($event: string): void {
    this.channelService.createChannelType($event).subscribe((res) => {
      this.channel_types.push(res);
      this.selectedType = res;
    });
  }

  public editType($event: ChannelType): void {
    this.dialogService
      .open(PromptDialogComponent, {
        header: 'Изменение типа канала',
        data: $event.name,
      })
      .onClose.pipe(
        takeWhile((res) => res),
        mergeMap((newName) => this.channelService.editChannelType($event.uuid, newName))
      )
      .subscribe((res) => {
        const edited = this.channel_types.find((item) => res.uuid === item.uuid);
        edited.name = res.name;
        this.selectedType = res;
      });
  }

  public deleteType($event: ChannelType): void {
    this.dialogService
      .open(ConfirmationDialogComponent, {
        header: 'Удаление узла связи',
        data: {
          message: `Вы действительно хотите удалить тип связи "${$event.name}"?`,
        },
      })
      .onClose.pipe(
        takeWhile((res) => res),
        mergeMap((_) => this.channelService.deleteChannelType($event))
      )
      .subscribe((res) => {
        this.channel_types = this.channel_types.filter((item) => item.uuid !== $event.uuid);
        this.getChannelTypes();
        this.selectedType = null;
      });
  }

  public documentsChanged(event: Document[]): void {
    this.channelForm.get('documents').setValue(event);
  }

  private createChannelForm(): void {
    this.channelForm = new FormGroup({
      channel_type: new FormControl('', Validators.required),
      connection_number: new FormControl('', Validators.required),
      zas_direction_number: new FormControl('', Validators.required),
      line_type: new FormControl('', Validators.required),
      establishment_connection_time: new FormControl('', Validators.required),
      channel_status: new FormControl('', Validators.required),
      note: new FormControl(''),
      documents: new FormControl([]),
    });
  }

  private fillForm(channel: Channel): void {
    if (this.channelForm && channel) {
      this.channelForm.setValue({
        channel_type: channel.channel_type,
        connection_number: channel.connection_number,
        zas_direction_number: channel.zas_direction_number,
        line_type: channel.line_type,
        establishment_connection_time: channel.establishment_connection_time,
        channel_status: this.channelStatuses.find((item) => item.uuid === channel.channel_status.uuid),
        note: channel.note,
        documents: channel.documents,
      });
      this.selectedType = channel.channel_type;
    }
  }

  private listenToChannelFormControls(): void {
    this.channelForm.get('channel_status').valueChanges.subscribe((changes: ChannelStatus) => {
      if (changes.name === 'Действующий') {
        const timezoneOffset = new Date().getTimezoneOffset();
        const time = new Date().setMinutes( new Date().getMinutes() - timezoneOffset);
        const date = new Date(time);
        this.channelForm
          .get('establishment_connection_time')
          .patchValue(date.toISOString().split('T').join(' ').split('.')[0]);
      }
    });
  }

  private getChannelTypes(): void {
    this.channelService.getChannelTypes().subscribe((res) => (this.channel_types = res));
  }

  private getChannelStatuses(): void {
    this.channelStatuses = this.nodeService.selectors.channel_statuses;
  }

  private checkMode(): void {
    if (this.config.data) {
      this.mode = 'edit';
    }
  }
}
