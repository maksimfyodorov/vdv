export const organizingVerifications = [
  {
    organizingVerification: 'Текст пример',
  },
  {
    organizingVerification: 'Текст пример 1',
  },
  {
    organizingVerification: 'Текст пример 2',
  },
];

export const verifiableMilitaryFormations = [
  {
    verifiableMilitaryFormation: 'Текст пример',
  },
  {
    verifiableMilitaryFormation: 'Текст пример 1',
  },
  {
    verifiableMilitaryFormation: 'Текст пример 2',
  },
];

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
