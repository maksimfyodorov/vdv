import { Injectable } from '@angular/core';
import { OspoCoordinatesComponent } from '../components/ospo-coordinates/ospo-coordinates.component';
import { COLS_WITH_HEIGHT, COLS_WITHOUT_HEIGHT } from '../infrastucture/table-cols';
import { Observable } from 'rxjs';
import { DialogService } from 'primeng/dynamicdialog';

@Injectable()
export class CoordinatesDialogService {

  constructor(
    private dialog: DialogService,
  ) {}

  public openOSPOCoordinatesWithHeight(): Observable<any> {
    return this.dialog.open(OspoCoordinatesComponent, {
      width: '1533px',
      data: {
        height: true,
        cols: COLS_WITH_HEIGHT,
      },
    }).onClose;
  }

  public openOSPOCoordinatesWithoutHeight(): Observable<any> {
    return this.dialog.open(OspoCoordinatesComponent, {
      width: '1533px',
      data: {
        height: false,
        cols: COLS_WITHOUT_HEIGHT,
      },
    }).onClose;
  }
}
