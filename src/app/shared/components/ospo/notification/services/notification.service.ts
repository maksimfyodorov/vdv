import { AuthService } from '../../../../services/auth.service';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { UserData } from '../../../../services/auth.types';
import { NotificationClasses } from '../constants';

export interface Notification {
  uuid?: string;
  title: string;
  description: string;
  payload?: unknown;
  date?: string;
  link?: NotificationLink;
  color?: string;
  type?: string;
  sender?: string;
}

export interface NotificationLink {
  type: string;
  [key: string]: any;
}

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private host = document.location.hostname;
  public socket: WebSocket = {} as WebSocket;

  private urls = [`ws://${this.host}:6010/`,
    `ws://${this.host}:6011/`,
    `ws://${this.host}:6012/`,
    `ws://${this.host}:6013/`];

  private availableUrl: string;
  private currentUser: UserData;

  constructor(
    private authService: AuthService,
    private primeMessage: MessageService,
  ) {
    authService.currentUser$.subscribe(user => this.currentUser = user);
  }

  public invoke(notification: Notification): void {
    this.primeMessage.add({
      severity: NotificationClasses[notification.color] || 'custom',
      summary: notification.title,
      detail: notification.description,
      data: { date: notification.date, link: notification.link, uuid: notification.uuid, sender: notification.sender},
      sticky: true,
    });
  }

  private connect(url: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const socket = new WebSocket(url);
      socket.onopen = () => {
        socket.send(JSON.stringify(this.currentUser));
        resolve(socket);
      };
      socket.onerror = (err) => {
        socket.close();
        reject(err);
      };
    });
  }

  public async createSocket(): Promise<any> {
    for (const url of this.urls) {
      let isSuccess = false;
      await this.connect(url).then((socket) => {
        console.log('CONNECT');
        isSuccess = true;
        this.socket = socket;
        this.availableUrl = url;
        this.setSocketBehaviour();
      }).catch(() => {
      });
      if (isSuccess) {
        break;
      }
    }
  }

  private setSocketBehaviour(): void {
    this.socket.onerror = (err) => {
      console.log('ERROR: ', err);
      this.socket.close();
      setTimeout(() => {
        this.socket = new WebSocket(this.availableUrl);
        this.setSocketBehaviour();
      }, 10000);
    };


    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      this.invoke({
        uuid: data.uuid,
        title: data.title,
        type: data.type_of_body,
        description: data.data,
        date: data.date,
        link: data.link,
        color: data.color,
        sender: data.sender,
      });
    };
  }
}
