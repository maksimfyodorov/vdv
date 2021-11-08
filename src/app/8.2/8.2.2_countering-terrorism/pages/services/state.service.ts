import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MilitaryUnitHierarchyItem } from '../../../../shared/components/ospo/military-units/military-units-sidebar/interfaces/interfaces';
import { GeneralInformation, NewBillData } from '../../interfaces/generalInformation';
import { ReportResults } from '../../interfaces/interface';

@Injectable()
export class StateService {

  private info = new BehaviorSubject<any>(null)
  private resultsVF = new BehaviorSubject<ReportResults>({
    militaryCity: 0,
    modeB: 0,
    modeAV: 0,
    ls: 0,
    vvAT: 0,
    vvBT: 0,
  })

  private newBillData = new BehaviorSubject<NewBillData>({
    inputNumber: null,
    inputDate: null,
  });

  private completeCreationFlag = new BehaviorSubject<boolean>(false);
  private pageIndex = new BehaviorSubject<number>(0);
  private composition = new BehaviorSubject<any>(null);
  private summaryUuid = new BehaviorSubject<string>(null);
  private selectedMilitaryUnit = new BehaviorSubject<MilitaryUnitHierarchyItem>(null);
  private reportUuid = new BehaviorSubject<string>(null);
  private generalInfo = new BehaviorSubject<GeneralInformation>({
    number: null,
    map: null,
    date: null,
    publication: null,
    control_point_uuid: null,
    summary_uuid: null,
  })
  private editDataFlag = new BehaviorSubject<boolean>(false);

  constructor() { }

  public addResultsVF(data: ReportResults): void {
    this.resultsVF.next({
      militaryCity: this.resultsVF.value.militaryCity + data.militaryCity,
      modeB: this.resultsVF.value.modeB + data.modeB,
      modeAV: this.resultsVF.value.modeAV + data.modeAV,
      ls: this.resultsVF.value.ls + data.ls,
      vvAT: this.resultsVF.value.vvAT + data.vvAT,
      vvBT: this.resultsVF.value.vvBT + data.vvBT,
    })
  }

  public reduceResultsVF(data: ReportResults): void {
    this.resultsVF.next({
      militaryCity: this.resultsVF.value.militaryCity - data.militaryCity,
      modeB: this.resultsVF.value.modeB - data.modeB,
      modeAV: this.resultsVF.value.modeAV - data.modeAV,
      ls: this.resultsVF.value.ls - data.ls,
      vvAT: this.resultsVF.value.vvAT - data.vvAT,
      vvBT: this.resultsVF.value.vvBT - data.vvBT,
    })
  }

  public returnInfo(): Observable<any> {
    return this.info.asObservable();
  }

  public changeInfo(data: any): void {
    this.info.next(data)
  }

  public returnResultsVF(): Observable<ReportResults> {
    return this.resultsVF.asObservable();
  }

  public changeCompleteCreationFlag(data: boolean): void {
    this.completeCreationFlag.next(data)
  }

  public returnCompleteCreationFlag(): Observable<boolean> {
    return this.completeCreationFlag.asObservable();
  }

  public changePageIndex(data: number): void {
    this.pageIndex.next(data)
  }

  public returnPageIndex(): Observable<number> {
    return this.pageIndex.asObservable();
  }

  public changeEditDataFlag(data: boolean): void {
    this.editDataFlag.next(data)
  }

  public returnEditDataFlag(): Observable<boolean> {
    return this.editDataFlag.asObservable();
  }

  public returnSummaryUuid(): Observable<string> {
    return this.summaryUuid.asObservable();
  }

  public setSummaryUuid(data: string): void {
    this.summaryUuid.next(data);
  }

  public returnMilitaryUnit(): Observable<MilitaryUnitHierarchyItem> {
    return this.selectedMilitaryUnit.asObservable();
  }

  public setMilitaryUnit(data: MilitaryUnitHierarchyItem): void {
    this.selectedMilitaryUnit.next(data);
  }

  public returnReportUuid(): Observable<string> {
    return this.reportUuid.asObservable();
  }

  public setReportUuid(data: string): void {
    this.reportUuid.next(data);
  }

  public returnNewBillData(): Observable<NewBillData> {
    return this.newBillData.asObservable();
  }

  public setNewBillData(data: NewBillData): void {
    this.newBillData.next(data);
  }

  public returnGeneralInfo(): Observable<GeneralInformation> {
    return this.generalInfo.asObservable();
  }

  public setGeneralInfo(data: GeneralInformation): void {
    this.generalInfo.next(data);
  }

  public setComposition(data: any) {
    this.composition.next(data)
  }

  public returnComposition() {
    return this.composition.asObservable();
  }
}
