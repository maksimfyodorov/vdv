import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-add-military-formation',
  templateUrl: './add-military-formation.component.html',
  styleUrls: ['./add-military-formation.component.scss']
})
export class AddMilitaryFormationComponent implements OnInit {

  public files1 =
    [
      {
        "label": "7дшд",
        "data": "7dshd",
        "children": [
          {
            "label": "11одшбр",
            "data": "11odshbr"
          },
          {
            "label": "31одшбр",
            "data": "31odshbr"
          }
        ]
      },
      {
        "label": "5дшд",
        "data": "5dshd",
        "children":
          [
            {
              "label": "12одшбр",
              "data": "12odshbr"
            }
          ]
      },
      {
        "label": "14дшд",
        "data": "14dshd",
        "children": [
          {
            "label": "61одшбр",
            "data": "61odshbr"
          },
          {
            "label": "91одшбр",
            "data": "91odshbr"
          },
          {
            "label": "23одшбр",
            "data": "23odshbr"
          }
        ]
      },
      {
        "label": "34дшд",
        "data": "34dshd",
        "children": [{
          "label": "53одшбр",
          "data": "53odshbr",
          "children": [
            {
              "label": "14полк",
              "data": "14polk"
            },
            {
              "label": "24 полк",
              "data": "24polk"
            }
          ]
        }]
      }
    ]


  public selectedFiles: any;

  constructor(
    private dialogRef: DynamicDialogRef,
  ) { }

  public ngOnInit(): void {
  }

  public closeDialog(): void {
    this.dialogRef.close({ field: this.selectedFiles.data, name: this.selectedFiles.label });
  }

}
