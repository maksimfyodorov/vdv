import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { LoaderService } from '../loader/loader.service';

@Component({
  selector: 'app-tree-dialog',
  templateUrl: './tree-dialog.component.html',
  styleUrls: ['./tree-dialog.component.scss'],
  providers: [LoaderService],
})
export class TreeDialogComponent implements OnInit {
  treeData: TreeNode[];
  selectedElement: TreeNode;

  constructor(
    public dialogRef: DynamicDialogRef,
    public config: DynamicDialogConfig,
    public loader: LoaderService,
  ) {
  }

  ngOnInit(): void {
    this.getTreeData();
  }

  getTreeData(): void {
    this.loader.startLoading(this.config.data).subscribe(res => {
      this.treeData = res;
    });
  }

  submit(): void {
    this.dialogRef.close(this.selectedElement);
  }

  closeWithoutSaveCancel(): void {
    this.dialogRef.close();
  }
}
