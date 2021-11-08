import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AccessLevel } from '../../services/auth.types';
import { RoleModelService } from '../../services/role-model.service';

@Component({
  selector: 'app-sidebar-tree',
  templateUrl: './sidebar-tree.component.html',
  styleUrls: ['./sidebar-tree.component.scss'],
})
export class SidebarTreeComponent implements OnInit {
  @Input() isTwenty: boolean;
  @Input() forWsBg = false;
  @Output() controlOnClick = new EventEmitter<boolean>();

  currentMode;
  showControl = false;
  public currentAccessLevel: AccessLevel;

  constructor(
    private roleModelService: RoleModelService,
  ) {
  }

  ngOnInit(): void {
    this.roleModelService.userAccessLevel$.subscribe(res => {
      this.currentAccessLevel = res;
      switch (this.currentAccessLevel) {
        case 'command':
          this.currentMode = 1;
          break;
        case 'conjunction':
          this.currentMode = 2;
          break;
        case 'regiment':
          this.currentMode = 3;
          break;
        default:
          this.currentMode = 0;
      }
    });

    if ((this.currentMode === 2 || this.currentMode === 1) && this.forWsBg) {
      this.showControl = true;
    }
  }

  controlClick(): void {
    this.controlOnClick.emit(true);
  }
}
