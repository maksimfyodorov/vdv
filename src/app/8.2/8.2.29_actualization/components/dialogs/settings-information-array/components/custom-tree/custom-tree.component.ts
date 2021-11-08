import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CustomTree } from "../../interfaces/custom-tree";


interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}
@Component({
  selector: 'app-custom-tree',
  templateUrl: './custom-tree.component.html',
  styleUrls: ['./custom-tree.component.scss']
})


export class CustomTreeComponent implements OnInit {

  dataSource: CustomTree[];
  selectedItem: CustomTree
  onSelected: boolean = false
  private _tree: CustomTree[];

  @Input() selectedForPropreties: string = ''

  @Input() set tree(value: CustomTree[]) {
    if (value) {
      this._tree = value;
    }
  }
  get tree() {
    return this._tree;
  }
  @Output() onSelectItem = new EventEmitter<CustomTree>();

  constructor() { }

  ngOnInit(): void {
    this.dataSource = this._tree
    if (this.selectedForPropreties !== '') {
      this.deepFind(this.dataSource, this.selectedForPropreties)
    }
  }

  selectItem(item: any): void {
    this.onSelected = true
    this.onSelectItem.emit(item);
  }

  deepFind(tree: CustomTree[], name: string) {
    tree.forEach(thing => {
      if (thing.name === name) {
        this.selectedItem = thing;
      }
      else {
        thing.children.forEach(item => {
          if (item.name === name) {
            this.selectedItem = item;
          }
          else {
            this.deepFind(thing.children, name)
          }
        })
      }
    })
  };

  getPath(item: CustomTree, subtree: CustomTree[], path: CustomTree[] = []): CustomTree[] {
    return subtree.map(nowItem => {
      if (nowItem.name === item.name) {
        return path.concat([nowItem]);
      }
      if (nowItem.children && !!nowItem.children.length) {
        return this.getPath(item, nowItem.children, path.concat([nowItem]))
      }
      return null;
    }).filter(x => !!x)[0] || [];
  }

  nodeSelect(event) {
  }

  nodeUnselect(event) {
  }

}
