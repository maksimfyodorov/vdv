import { Period } from '../../../period/interfaces';

export interface ControlType {
  name: string;
  key: string;
}

export interface Status {
  uuid: string;
  class?: 'planned' | 'normal' | 'stop' | 'preaccident' | 'accident';
  description?: string;
  icon?: string;
  name: string;
}

export interface CufServer {
  uuid: string;
  url: string;
}

export interface Host {
  id: number;
  name: string;
}

export interface TriggerI {
  trigger_id?: string;
  hostTrigger: HostTrigger;
  statusOnTriggered: Status;
  doReport: boolean;
}

export interface HostTrigger {
  id: number;
  name: string;
}


export interface CufData {
    uuid?: string;
    message: string;
    periods?: Period[];
    server?: CufServer;
    host_id?: Host;
    triggers?: TriggerI[];
    manual?: string;
    type?: string;
}
