import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AttachedFiles, FileToShow } from './uploaded-files.types';
import { AttachDocumentDialogService } from '../../../attach-document-dialog.service';

@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.scss'],
  providers: [AttachDocumentDialogService],
})
export class UploadFilesComponent {
  @Input() public readMode = false;
  @Input() public filesToShow: FileToShow[] = [];
  @Input() public documentId: string;
  @Output() public changed = new EventEmitter<AttachedFiles>();
  @Output() public download = new EventEmitter<number>();
  public attachedFiles: AttachedFiles = {
    uploaded: [],
    deleted: [],
  };

  constructor() {
  }

  public onSelect(event): void {
    this.attachedFiles.uploaded.push(...event.addedFiles);
    this.filesToShow.push(...event.addedFiles);
    this.changed.emit(this.attachedFiles);
  }

  public onRemove(event): void {
    if (this.attachedFiles.uploaded.includes(event)) {
      this.attachedFiles.uploaded.splice(this.attachedFiles.uploaded.indexOf(event), 1);
    }
    if (!this.attachedFiles.deleted.includes(event.uuid) && event.uuid) {
      this.attachedFiles.deleted.push(event.uuid);
    }
    this.filesToShow.splice(this.filesToShow.indexOf(event), 1);
    this.changed.emit(this.attachedFiles);
  }

  public downloadFile(f): void {
    window.open(`/api/documents/${this.documentId}/files/${f.uuid}`, '_self');
  }
}
