export interface AssignmentDocument {
  summary: string;
  status: AssignmentDocumentStatus;
  number: string;
  date: string;
  uuid: string;
  name: string;
  type: AssignmentDocumentType;
  created_at: string;
  group: AssignmentDocumentGroup;
  files: AssignmentDocumentFile;
}

export interface AssignmentDocumentFile {
  name: string;
}

export interface AssignmentDocumentGroup {
  name: string;
  uuid: string;
  path: string;
}

export interface AssignmentDocumentType {
  description: null,
  name: string
  uuid: string
  pattern: null,
  kind: {
    name: string
    uuid: string
  }
}

export interface AssignmentDocumentStatus {
  name: string;
  code: string;
  uuid: string;
}
