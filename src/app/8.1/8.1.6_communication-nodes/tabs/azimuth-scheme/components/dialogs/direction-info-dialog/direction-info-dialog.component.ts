import { Component, Inject, OnInit } from '@angular/core';
import { Channel, Direction, Node } from '../../nodes-scheme/nodes.scheme.types';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-direction-info-dialog',
  templateUrl: './direction-info-dialog.component.html',
  styleUrls: ['./direction-info-dialog.component.scss', '../direction/create-edit-direction-dialog/create-edit-direction-dialog.component.scss']
})
export class DirectionInfoDialogComponent implements OnInit {

  public direction: Direction;
  public startNode: Node;
  public endNode: Node;
  public sortedChannels = {};
  public accordionIsCollapsed = {};
  public channels: Channel[] = [];


  constructor(
    @Inject(MAT_DIALOG_DATA) private data,
  ) { }

  ngOnInit(): void {
    this.channels = this.data.direction.channels;
    this.direction = this.data.direction;
    this.startNode = this.data.startNode;
    this.endNode = this.data.endNode;

    this.fillDirection();
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

  public toggleAccordion(channelType: string): void {
    this.accordionIsCollapsed[channelType] = !this.accordionIsCollapsed[channelType];
  }

}
