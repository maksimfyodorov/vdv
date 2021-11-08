import { Document, DocumentsByGroup, File, User } from '../../shared/components/ospo/documents/documents.types';

export const FILES: File[] = [
  {
    uuid: '1',
    name: 'Файл 1.txt',
    size: '500 kb',
    type: 'text',
  },
  {
    uuid: '2',
    name: 'Файл 2.txt',
    size: '500 kb',
    type: 'text',
  },
  {
    uuid: '3',
    name: 'Файл 3.txt',
    size: '500 kb',
    type: 'text',
  },
];

export const USER: User = {
  id: '1111',
  username: 'Ivanov Ivan',
  full_name: 'Ivanov Ivan Ivanovich',
};

// @ts-ignore
export const DOCUMENTS: Document[] = [
  {
    uuid: '11',
    name: 'Документ 1',
    files: FILES,
    date: '11.01.2002',
    number: '11',
    user: USER,
    created_at: '11.12.2222',
  },
  {
    uuid: '12',
    name: 'Документ 2',
    files: FILES,
    date: '11.01.2002',
    number: '11',
    user: USER,
    created_at: '11.12.2222',
  },
  {
    uuid: '13',
    name: 'Документ 3',
    files: [
      {
        uuid: '3',
        name: 'Файл 3.txt',
        size: '500 kb',
        type: 'text',
      },
    ],
    date: '11.01.2002',
    number: '11',
    user: USER,
    created_at: '11.12.2222',
  },
];

export const DOCUMENTS_BY_GROUP: DocumentsByGroup[] = [
  {
    group_name: 'Запланирована',
    documents: [
      {
        uuid: '1fa4a88c-4202-4cd6-b55e-af0596ccf5ee',
        name: 'Документ',
        number: '3',
        group: 'ИРЗ 8.1.5',
        kind: 'Приказ',
        date: '21.04.2021',
        military_unit: null,
        files: [
          {
            uuid: '1fa4a88c-4202-4cd6-b55e-af0596ccf5e3',
            name: 'DOK1',
            type: 'pdf',
            size: '0.4Кб'
          },
        ],
        created_at: '21.04.2021',
        user: {
          id: 'd0f31b9d-b0db-4138-895cg45g54g',
          username: 'shtkvdv01',
          full_name: 'Романов Максим Максимович'
        }
      },
      {
        uuid: '1fa4a88c-4202-4cd6-235235645',
        name: 'Документ',
        number: '3',
        group: 'ИРЗ 8.1.5',
        kind: 'Приказ',
        date: '21.04.2021',
        military_unit: null,
        files: [
          {
            uuid: '1fa4a88c-4202-4cd6-25254325',
            name: 'DOK3',
            type: 'pdf',
            size: '0.4Кб'
          },
          {
            uuid: 'f226dc1e-5a15-47c5-b265-804350ad2508',
            name: 'DOK4',
            type: 'pdf',
            size: '0.4Кб'
          }
        ],
        created_at: '21.04.2021',
        user: {
          id: 'd0f31b9d-b0db-4138-895c-4b40ef38ba28',
          username: 'shtkvdv01',
          full_name: 'Романов Максим Максимович'
        }
      }
    ]
  },
  {
    group_name: 'Перенесена c 04.02.2022-24.02.2022, на 15.02.2021-16.03.2021',
    documents: [
      {
        uuid: '1fa4a88c-4202-4cd6-b55e-af059611111',
        name: 'Документ',
        number: '3',
        group: 'ИРЗ 8.1.5',
        kind: 'Приказ',
        date: '21.04.2021',
        military_unit: null,
        files: [
          {
            uuid: '1fa4a88c-4202-4cd6-b55e-dwfwwfc',
            name: 'DOK1',
            type: 'pdf',
            size: '0.4Кб'
          },
          {
            uuid: 'f226dc1e-5a15-47c5-b265-804350ad2508',
            name: 'DOK1',
            type: 'pdf',
            size: '0.4Кб'
          }
        ],
        created_at: '21.04.2021',
        user: {
          id: 'd0f31b9d-b0db-4138-895c-4b40ef38ba28',
          username: 'shtkvdv01',
          full_name: 'Романов Максим Максимович'
        }
      },
      {
        uuid: '1fa4a88c-4202-4cd6-b55e-af0596ccf5e1',
        name: 'Документ',
        number: '3',
        group: 'ИРЗ 8.1.5',
        kind: 'Приказ',
        date: '21.04.2021',
        military_unit: null,
        files: [
          {
            uuid: '1fa4a88c-4202-4cd6-b55ewqfawfw',
            name: 'DOK1',
            type: 'pdf',
            size: '0.4Кб'
          },
        ],
        created_at: '21.04.2021',
        user: {
          id: 'd0f31b9d-b0db-4138-895c-4b40ef38ba28',
          username: 'shtkvdv01',
          full_name: 'Романов Максим Максимович'
        }
      }
    ]
  }
];

