export interface AttachedFiles {
  uploaded: File[];
  deleted: number[];
}

export interface FileToShow {
  type?: string;
  uuid: string;
  size: number;
  name: string;
}
