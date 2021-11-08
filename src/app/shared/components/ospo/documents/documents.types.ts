export interface Document {
  uuid: string;
  name: string;
  group?: string;
  kind?: string;
  military_unit?: string;
  files: File[];
  date?: string;
  number?: string;
  user?: User;
  created_at?: string;
}

export interface DocumentsByGroup {
  group_name: string;
  documents: Document[];
}

export interface User {
  id: string;
  username: string;
  full_name: string;
}

export interface File {
  uuid: string;
  name: string;
  size?: string;
  type?: string;
  isMainDocument?: boolean;
}
