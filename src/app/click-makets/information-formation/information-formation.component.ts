import { Component, OnInit } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { MenuItem } from 'primeng/api';
import { DocumentLinks } from '../../shared/components/document-links-list/document-links-list.component';

interface A {
  id: number;
  name: string;
}

@Component({
  selector: 'app-information-formation',
  templateUrl: './information-formation.component.html',
  styleUrls: ['./information-formation.component.scss'],
})
export class InformationFormationComponent implements OnInit {

  pages: A[] = [];
  selecredPage: A;
  pages2: A[] = [];
  selecredPage2: A;
  display1 = false;
  display2 = false;
  display3 = false;
  display4 = false;
  display5 = false;
  display6 = false;
  display7 = false;
  display8 = false;
  display9 = false;
  page2 = false;
  page = 1;

  state1: boolean = true;
  state2: boolean = false;
  visibleSetting: boolean = false;
  additingPort: boolean = false;
  additingTechnic: boolean = false;
  generatedReport: boolean = false;
  generatedReport1: boolean = false;
  generatedReport2: boolean = false;
  generatedReport3: boolean = false;
  visibleToolTip: boolean = false;
  settingState: boolean = false;
  settingState1: boolean = false;
  editableState: boolean = false;
  editableNetwork: boolean = false;
  viewDocuments: boolean = false;
  coords: boolean = false;
  visibleAddChannel: boolean = false;
  addNewCenter: boolean = false;

  dialogDocumentsLinks: DocumentLinks[] = [
    {
      link: 'https://fs.rd.aorti.ru/s/9YpZG6f7dy4BckT/download?path=%2F&files=8_1_6_%D0%93%D1%80%D0%B0%D1%84%D0%B8%D0%BA%20%D1%81%D0%BE%D1%81%D1%82%D0%BE%D1%8F%D0%BD%D0%B8%D1%8F%20%D1%81%D0%B2%D1%8F%D0%B7%D0%B8.fodt',
      name: 'График состояния связи.fodt',
    },
    {
      link: 'https://fs.rd.aorti.ru/s/9YpZG6f7dy4BckT/download?path=%2F&files=8_1_6_%D0%9E%D0%B1%D0%B5%D1%81%D0%BF%D0%B5%D1%87%D0%B5%D0%BD%D0%BD%D0%BE%D1%81%D1%82%D1%8C%20%D1%82%D0%B5%D1%85%D0%BD%D0%B8%D0%BA%D0%B8%20%D1%81%D0%B2%D1%8F%D0%B7%D0%B8.fodt',
      name: 'Обеспеченность техники связи.fodt',
    },
    {
      link: 'https://fs.rd.aorti.ru/s/9YpZG6f7dy4BckT/download?path=%2F&files=8_1_6_%D0%A1%D0%BE%D1%81%D1%82%D0%BE%D1%8F%D0%BD%D0%B8%D0%B5%20%D1%81%D1%80%D0%B5%D0%B4%D1%81%D1%82%D0%B2%20%D0%90%D0%A1%D0%A3.fodt',
      name: 'Состояние средств АСУ.fodt',
    },
    {
      link: 'https://fs.rd.aorti.ru/s/9YpZG6f7dy4BckT/download?path=%2F&files=8_1_6_%D1%81%D1%85%D0%B5%D0%BC%D0%B0-%D0%BF%D1%80%D0%B8%D0%BA%D0%B0%D0%B7%20%D0%903.fodt',
      name: 'Схема-приказ А3.fodt',
    },
    {
      link: 'https://fs.rd.aorti.ru/s/9YpZG6f7dy4BckT/download?path=%2F&files=8_1_6_%D1%81%D1%85%D0%B5%D0%BC%D0%B0-%D0%BF%D1%80%D0%B8%D0%BA%D0%B0%D0%B7%20%D0%904.fodt',
      name: 'Схема-приказ А4.fodt',
    },
    {
      link: 'https://fs.rd.aorti.ru/s/9YpZG6f7dy4BckT/download?path=%2F&files=8_1_6_%D0%A3%D0%BA%D0%BE%D0%BC%D0%BF%D0%BB%D0%B5%D0%BA%D1%82%D0%BE%D0%B2%D0%B0%D0%BD%D0%BD%D0%BE%D1%81%D1%82%D1%8C%20%D0%A3%D0%A1.fodt',
      name: 'Укомплектованность УС.fodt',
    },
  ];

  constructor() {
  }

  ngOnInit(): void {
    this.pages = [
      {
        id: 1,
        name: 'Схема',
      },
      {
        id: 2,
        name: 'Карта',
      },
      {
        id: 3,
        name: 'График связи',
      },
    ];
    this.pages2 = [
      {
        id: 1,
        name: 'Узлы',
      },
      {
        id: 2,
        name: 'Карта',
      },
      {
        id: 3,
        name: 'Обеспеченность',
      },
      {
        id: 4,
        name: 'Укомплектованность',
      },
      {
        id: 5,
        name: 'Информационные порты',
      },
      {
        id: 6,
        name: 'Мнемосхема БП',
      },
    ];
    this.selecredPage = this.pages[0];
    this.selecredPage2 = this.pages2[0];
  }


  generateReport(): void {
    this.generatedReport = true;

    setTimeout(() => (this.generatedReport = false), 3000);
  }


  generateReport1(): void {
    this.generatedReport1 = true;

    setTimeout(() => (this.generatedReport1 = false), 3000);
  }


  generateReport2(): void {
    this.generatedReport2 = true;

    setTimeout(() => (this.generatedReport2 = false), 3000);
  }


  generateReport3(): void {
    this.generatedReport2 = true;

    setTimeout(() => (this.generatedReport2 = false), 3000);
  }

}
