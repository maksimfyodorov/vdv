import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.scss'],
})
export class NodeComponent implements OnInit {

  tree: FormGroup;
  selectedValues: boolean = false;
  inputText: string = '';

  constructor(private dialogRef: DynamicDialogRef,
  ) { }

  ngOnInit(): void {
    this.tree = new FormGroup({
      groupname: new FormControl('', Validators.required),
    });
  }

  saveInfo(){
    let obj = {
      path: this.inputText,
      is_dir: this.selectedValues,
      children: [] 
    }
    this.dialogRef.close(obj);
  }

  closeWindow(){
    this.dialogRef.close();
  }

}
