import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CheckCombatReadinessDataService {

  public selectedSchedule;
  public selectedScheduleUuid: string;
  public selectedInspectionId: string;
  public inspectionStatuses;
  public selectedSchedulePrintDate = {
    firstDate: null,
    twoDate: null,
  };

  public selectedPrintDateType: string;


  swapDayWithMonth(date: string): string {
    const newDate = ['', '', ''];
    const convertedDate = date.split('.');
    newDate[0] = convertedDate[2];
    newDate[1] = convertedDate[1];
    newDate[2] = convertedDate[0];
    return newDate.join('.');
  }

  getStatusIndexByStatusName(statusName): number {
    switch (statusName) {
      case 'Запланирована':
        return 0;
      case  'На исполнении':
        return 1;
      case  'Завершена':
        return 2;
      case  'Закрепление статуса':
        return 3;
    }
  }

  getInspectionStatusUuidByName(statuses, name): string {
    for (let i = 0; i < statuses.length; i++) {
      if (statuses[i].name === name) {
        return statuses[i].uuid;
      }
    }
  }

}
