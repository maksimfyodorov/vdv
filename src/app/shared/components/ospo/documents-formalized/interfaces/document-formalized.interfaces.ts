export interface FormalizedDocuments {
  [groupName: string]: FormalizedDocument[];
}

export interface FormalizedDocument {
  uuid: string;
  name: string;
  files: File[];
  disabled?: boolean;
  mode?: string;
}

export interface File {
  type: FileType;
  name: string;
  uuid: string;
}

export type FileType = 'JSON' | 'XML' | 'ODT' | 'FODT' | 'PDF';
