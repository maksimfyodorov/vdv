export const Answers = [
  {
    answerTitle: 'Критерии',
    answerTexts: ['Критерий1', 'Критерий2', 'Критерий3'],
  },
  {
    answerTitle: 'Критерии',
    answerTexts: ['Критерий5', 'Критерий2', 'Критерий3'],
  },
  {
    answerTitle: 'Критерии',
    answerTexts: ['Критерий6', 'Критерий2', 'Критерий3'],
  },
  {
    answerTitle: 'Критерии',
    answerTexts: ['Критерий7', 'Критерий2', 'Критерий3'],
  },

];

export const Criteria = [
  {
    criteriaName: 'Критерий1',
  },
  {
    criteriaName: 'Критерий2',
  },
  {
    criteriaName: 'Критерий3',
  },
  {
    criteriaName: 'Критерий4',
  },
  {
    criteriaName: 'Критерий5',
  },
  {
    criteriaName: 'Критерий6',
  },
  {
    criteriaName: 'Критерий7',
  },
  {
    criteriaName: 'Критерий8',
  },
  {
    criteriaName: 'Критерий9',
  },
  {
    criteriaName: 'Критерий10',
  },
];

export const CheckingStruction = [
  {
    structionId: 1,
    structionText: 'Проверка отопления',
  },
  {
    structionId: 2,
    structionText: 'Проверка оборудования',
  },
  {
    structionId: 3,
    structionText: 'Проверка информации',
  },
  {
    structionId: 4,
    structionText: 'Проверка защиты',
  },
];

export const Subdivision = [
  {
    subdivisionId: 1,
    subdivisionText: 'Воздушная дивизия',
  },
  {
    subdivisionId: 2,
    subdivisionText: 'Пехотная дивизия',
  },
  {
    subdivisionId: 3,
    subdivisionText: 'Сухопутная дивизия',
  },
  {
    subdivisionId: 4,
    subdivisionText: 'Швейная дивизия',
  },
];

export const Chairperson = [
  {
    chairpersonId: 1,
    chairpersonText: 'Сергей Иванов',
  },
  {
    chairpersonId: 2,
    chairpersonText: 'Михаил Павлович',
  },
  {
    chairpersonId: 3,
    chairpersonText: 'Кирилл Павлович',
  },
  {
    chairpersonId: 4,
    chairpersonText: 'Александр Ложкин',
  },
];

export const ViceChairman = [
  {
    viceChairmanId: 1,
    viceChairmanText: 'Денис Сошкин',
  },
  {
    viceChairmanId: 2,
    viceChairmanText: 'Владимир Анатольевич',
  },
  {
    viceChairmanId: 3,
    viceChairmanText: 'Георгий Карпов',
  },
  {
    viceChairmanId: 4,
    viceChairmanText: 'Анатолий Владимирович',
  },
];

export const CommissionMembers1 = [
  {
    commissionMembersId: 1,
    commissionMembersText: 'Александр Мониторов',
  },
  {
    commissionMembersId: 2,
    commissionMembersText: 'Валерий Жмышенко',
  },
  {
    commissionMembersId: 3,
    commissionMembersText: 'Эмануил Альбертов',
  },
  {
    commissionMembersId: 4,
    commissionMembersText: 'Алексей Кружкин',
  },
];

export const CommissionMembers2 = [
  {
    commissionMembersId: 1,
    commissionMembersText: 'Павел Сидорович',
  },
  {
    commissionMembersId: 2,
    commissionMembersText: 'Жанна Светская',
  },
  {
    commissionMembersId: 3,
    commissionMembersText: 'Наташа Ростова',
  },
  {
    commissionMembersId: 4,
    commissionMembersText: 'Катерина Смирнова',
  },
];

export const ViewingCheckData =
  {
    answer: Answers,
    checkingStruction: CheckingStruction,
    subdivision: Subdivision,
    dateStart: '03,15,2021',
    dateEnd: '12,05,2021',
    chairperson: Chairperson,
    viceChairman: ViceChairman,
    commissionMembers1: CommissionMembers1,
    commissionMembers2: CommissionMembers2,
    activeIndex: 0,
  };


export const tree = [
  {
    label: 'Все части',
    data: 'Documents Folder',
    children: [{
      label: 'Воинская часть Пермь',
      data: 'Work Folder',
      children: [{
        label: 'Воинская часть 1',
        data: 'Work Folder',
      },
        {
          label: 'Воинская часть 2',
          data: 'Home Folder',
        }]

    },
      {
        label: 'Воинская часть Тверь',
        data: 'Home Folder',
        children: [{label: 'Воинская часть 3', data: 'Invoices for this month'}]
      }]
  },
];
