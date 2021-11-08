export interface Server {
  uuid: string;
  server: string;
  server_type: SharedProperty;
}

export interface SharedProperty {
    uuid: string;
    type: string;
}
