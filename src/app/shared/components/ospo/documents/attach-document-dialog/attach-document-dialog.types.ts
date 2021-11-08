import { File } from '../documents.types';

export interface DocumentType {
  uuid: string;
  name: string;
}

export interface DocumentKind {
  uuid: string;
  name: string;
}

export interface Group {
  uuid: string;
  name: string;
}

export interface Document {
  uuid: string;
  name: string;
  military_unit: MilitaryUnit;
  date: string;
  number: string;
  type?: DocumentType;
  kind: DocumentKind;
  group: Group;
  summary: string;
  created_at?: string;
  user?: User;
}

export interface User {
  full_name: string;
  id: string;
  username: string;
}

export interface DocumentPreview {
  uuid: string;
  name: string;
  date: string;
  number: string;
  kind: string;
  group?: string;
  created_at?: string;
  military_unit?: string;
  user?: User;
  files?: File[];
}

export type AttachDialogMode = 'single' | 'multiple';

export type DocumentMode = 'edit' | 'view' | 'create';

export interface MilitaryUnit {
  common_number_name: string;
  name: string;
  id: number;
}

export interface QueryParams {
  group_uuid?: string;
  kind_uuid?: string;
  type_uuid?: string;
  military_unit_id?: string;
  limit?: number;
  name?: string;
  offset?: number;
  order_by?: string;
  repeat?: string;
}

export interface NewType {
  name: string;
  kind_uuid: string;
}
