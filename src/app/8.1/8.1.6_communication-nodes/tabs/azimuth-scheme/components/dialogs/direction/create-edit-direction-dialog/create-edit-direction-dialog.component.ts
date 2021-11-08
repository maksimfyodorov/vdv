import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CreateEditChannelDialogComponent } from '../../channel/create-edit-channel-dialog/create-edit-channel-dialog.component';
import { take, takeWhile } from 'rxjs/operators';
import { NodesSchemeService } from '../../../nodes-scheme/services/nodes-scheme.service';
import { Channel, Direction, DirectionType, Mode } from '../../../nodes-scheme/nodes.scheme.types';
import { ConfirmationDialogComponent } from '../../../../../../../../shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-create-edit-direction-dialog',
  templateUrl: './create-edit-direction-dialog.component.html',
  styleUrls: ['./create-edit-direction-dialog.component.scss']
})
export class CreateEditDirectionDialogComponent implements OnInit {

  public currentType: DirectionType;
  public types: DirectionType[];
  public mode: Mode = 'create';
  public channels: Channel[] = [];
  public sortedChannels = {};
  public accordionIsCollapsed = {};
  private direction: Direction;

  constructor(
    private config: DynamicDialogConfig,
    private dialogRef: DynamicDialogRef,
    private dialogService: DialogService,
    private nodeSchemeService: NodesSchemeService
  ) { }

  ngOnInit(): void {
    this.checkMode();
    this.getTypes();
  }

  private checkMode(): void {
    if (this.config.data.direction) {
      this.mode = 'edit';
      this.direction = this.config.data.direction;
      this.fillDirection();
    }
  }

  private fillDirection(): void {
    this.channels = this.direction.channels;
    this.sortChannels();
  }

  private sortChannels(): void {
    const sortedChannels = {};
    this.channels.forEach(channel => {
      if (!sortedChannels.hasOwnProperty(channel.channel_type?.name)) {
        sortedChannels[channel.channel_type?.name] = [ channel ];
      } else {
        sortedChannels[channel.channel_type?.name].push(channel);
      }
    });
    this.sortedChannels = sortedChannels;
  }

  public saveDirection(): void {
    if (this.mode === 'create') {
      this.createDirection();
      this.nodeSchemeService.postDirection(this.direction);
    } else {
      this.direction.direction_type = this.currentType;
      this.direction.channels = this.channels;
      this.nodeSchemeService.patchDirection(this.direction);
    }
    this.dialogRef.close();
  }

  private createDirection(): void {
    const direction = {} as Direction;
    direction.uuid = (new Date().getMilliseconds() * Math.random() * 100).toFixed();
    direction.channels = this.channels;
    direction.node_out_uuid = this.config.data.start.baseObject.uuid;
    direction.node_in_uuid = this.config.data.end.baseObject.uuid;
    direction.direction_type = this.currentType;
    this.direction = direction;
  }

  public cancelDialog(): void {
    this.dialogRef.close();
  }

  public deleteDirection(): void {
    this.dialogService.open(ConfirmationDialogComponent, {
      header: 'Удаление направления',
      data: {
        message: `Вы действительно хотите удалить направление?`
      }
    }).onClose.pipe(takeWhile(res => res)).subscribe(_ => {
      this.nodeSchemeService.deleteDirection(this.direction);
      this.dialogRef.close();
    });
  }

  public addChannel(): void {
    this.dialogService
      .open(CreateEditChannelDialogComponent, {header: 'Добавление канала связи'})
      .onClose.pipe(takeWhile(res => res), take(1))
      .subscribe(res => {
        res.uuid = (new Date().getMilliseconds() * Math.random() * 100).toFixed();
        this.channels.push(res);
        this.sortChannels();
      });
  }

  public editChannel(channel: Channel): void {
    this.dialogService.open(CreateEditChannelDialogComponent, {header: `Редактирование канала связи`, data: channel})
      .onClose.pipe(takeWhile(res => res), take(1)).subscribe(res => {
        if (res === 'delete') {
          this.deleteChannel(channel);
        } else {
          this.channels = this.channels.map(item => {
            if (channel.uuid === item.uuid) {
              res.uuid = channel.uuid;
              return res;
            } else {
              return item;
            }
          });
        }
        this.sortChannels();
    });
  }

  public deleteChannel(channel: Channel): void {
    this.dialogService.open(ConfirmationDialogComponent, {header: 'Удаление канала связи'}).onClose
      .pipe(takeWhile(res => res))
      .subscribe(res => {
      this.channels = this.channels.filter(item => item.uuid !== channel.uuid );
      this.sortChannels();
      this.nodeSchemeService.deleteChannel(channel);
    });
  }

  public toggleAccordion(channelType: string): void {
    this.accordionIsCollapsed[channelType] = !this.accordionIsCollapsed[channelType];
  }

  private getTypes(): void {
    this.types = this.nodeSchemeService.selectors.direction_types;
    this.currentType = this.types.find(item => item.uuid === this.direction?.direction_type?.uuid);
  }
}
