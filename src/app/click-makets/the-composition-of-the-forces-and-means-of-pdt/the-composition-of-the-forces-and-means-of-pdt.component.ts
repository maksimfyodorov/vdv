import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CancelInspectionDialogComponent } from '../../8.1/8.1.5_check-combat-readiness/components/dialogs/inspection/cancel-inspection-dialog/cancel-inspection-dialog.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { InformingDialogComponent } from './informing-dialog/informing-dialog.component';
import { MilitoryTownDialogComponent } from './militory-town-dialog/militory-town-dialog.component';
import { DokiDialogComponent } from './doki-dialog/doki-dialog.component';
import { CreateEditInformingDialogComponent } from './create-edit-informing-dialog/create-edit-informing-dialog.component';
import { ReportBackDialogComponent } from './report-back-dialog/report-back-dialog.component';
import { DocumentLinks } from '../../shared/components/document-links-list/document-links-list.component';

import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-the-composition-of-the-forces-and-means-of-pdt',
  templateUrl: './the-composition-of-the-forces-and-means-of-pdt.component.html',
  styleUrls: ['./the-composition-of-the-forces-and-means-of-pdt.component.scss'],
})
export class TheCompositionOfTheForcesAndMeansOfPdtComponent implements OnInit {
  hasList: boolean = false;
  hasListWithResult: boolean = false;
  hasListWithAllResult: boolean = false;
  hasReport: boolean = false;
  hasTree: boolean = false;

  hasChildrenResult: boolean = false;
  hasChildrenAllResult: boolean = false;

  visibleMilitaryCityInfo1: boolean = false;
  visibleMilitaryCityInfo2: boolean = false;
  visibleMilitaryCityInfo3: boolean = false;
  visibleMilitaryCityInfo4: boolean = false;
  visibleMilitaryCityInfo5: boolean = false;
  visibleMilitaryCityInfo6: boolean = false;
  visibleMilitaryCityInfo7: boolean = false;

  editMilitaryCity: boolean = false;

  hasMilitaryCities: boolean = false;

  visibleCreateDialogList: boolean = false;
  visibleCreateDialogMilitaryCity: boolean = false;
  visibleViewDocuments: boolean = false;
  visibleCreateDocuments: boolean = false;
  visibleAdditingData: boolean = false;

  createMilitaryCityFirstStep: boolean = true;
  createMilitaryCitySecondStep: boolean = false;
  createMilitaryCityThirdStep: boolean = false;

  visibleAdditingReport: boolean = false;
  reportStep: number = 1;

  generatedReport: boolean = false;

  dialogDocumentsLinks: DocumentLinks[] = [
    {
      link: 'https://fs.rd.aorti.ru/s/9YpZG6f7dy4BckT/download?path=%2F&files=8_2_2_%D0%92%D0%B5%D0%B4%D0%BE%D0%BC%D0%BE%D1%81%D1%82%D1%8C%20%D0%BA%D0%BE%D0%BD%D1%82%D1%80%D0%BE%D0%BB%D1%8F%20%D1%81%D0%B8%D0%BB%D0%B8%20%D1%81%D1%80%D0%B5%D0%B4%D1%81%D1%82%D0%B2%20%D0%BF%D1%80%D0%BE%D1%82%D0%B8%D0%B2%D0%BE%D0%B4%D0%B5%D0%B9%D1%81%D1%82%D0%B2%D0%B8%D1%8F%20%D1%82%D0%B5%D1%80%D1%80%D0%BE%D1%80%D0%B8%D0%B7%D0%BC%D1%83.fodt',
      name: 'Ведомость контроля сили средств противодействия терроризму.fodt',
    },
    {
      link: 'https://fs.rd.aorti.ru/s/9YpZG6f7dy4BckT/download?path=%2F&files=8_2_2_%D0%94%D0%BE%D0%BD%D0%B5%D1%81%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BF%D0%BE%20%D0%BF%D1%80%D0%BE%D1%82%D0%B8%D0%B2%D0%BE%D0%B4%D0%B5%D0%B9%D1%81%D1%82%D0%B2%D0%B8%D1%8E%20%D1%82%D0%B5%D1%80%D1%80%D0%BE%D1%80%D0%B8%D0%B7%D0%BC%D1%83.fodt',
      name: 'Донесение по противодействию терроризму.fodt',
    }
  ];

  reportStages: MenuItem[] = [
    {
      label: '',
      icon: 'pi pi-info-circle',
      command: () => {
        this.reportStep = 1;
        this.activeStage = this.reportStages[0];
      },
    },
    {
      label: 'Состав',
      command: () => {
        this.reportStep = 2;
        this.activeStage = this.reportStages[1];
      },
    },
    {
      label: 'Обстановка в регионе',
      command: () => {
        this.reportStep = 3;
        this.activeStage = this.reportStages[2];
      },
    },
    {
      label: 'Организация',
      command: () => {
        this.reportStep = 4;
        this.activeStage = this.reportStages[3];
      },
    },
    {
      label: 'План',
      command: () => {
        this.reportStep = 5;
        this.activeStage = this.reportStages[4];
      },
    },
    {
      label: 'Работа',
      command: () => {
        this.reportStep = 6;
        this.activeStage = this.reportStages[5];
      },
    },
    {
      label: 'Проверки',
      command: () => {
        this.reportStep = 7;
        this.activeStage = this.reportStages[6];
      },
    },
    {
      label: 'Учения',
      command: () => {
        this.reportStep = 8;
        this.activeStage = this.reportStages[7];
      },
    },
  ];

  activeStage: MenuItem = this.reportStages[0];

  constructor() {}

  ngOnInit(): void {}

  createList(): void {
    this.hasList = true;
    this.visibleCreateDialogList = false;
  }

  generateReport(): void {
    this.generatedReport = true;

    setTimeout(() => (this.generatedReport = false), 3000);
  }
}
