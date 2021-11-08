export const DECISIONS = [
  {
    name: 'Заключить в установленном порядке государственный контракт на дооснащение мебелью жилого дома №5',
    term_of_execution: '22.12.2021',
    executor: 'ДС МО РФ совместно с ФКП «УЗКС МО РФ»',
    progress: 'ГК не заключен, ТЗ утверждено, ОНЦ посчитано, не утверждено',
    status: 'На исполнении',
  },{
    name: 'Уведомить ДЭСиОКУ МО РФ о планируемых сроках передачи ФГБУ «ЦЖКУ» МО РФ',
    term_of_execution: '22.12.2021',
    executor: 'ДС МО РФ совместно с ФКП «УЗКС МО РФ»',
    progress: 'Дома эксплуатируются в АО «ГУОВ», мероприятия по передачи домов в эксплуатацию ФГБУ «ЦЖКУ» МО РФ не начаты.',
    status: 'Не исполнено',
  },
]

export const MOCK_ORDERS = [
  {
    co_executors: [
      {
        military_unit: null,
        uuid: "95588220-7a8c-445c-84b5-c1f3b3ba62df",
        shdk: null,
        military_man: null
      }
    ],
    description_by_execution: null,
    executor: {
      military_unit: {
        pid: 10000000,
        uuid: "00000000-0000-0000-0000-000000000000",
        purpose_mu: {
          code: "000",
          id: 1,
          name: "Вооруженные силы Российской Федерации",
          parent_id: null
        },
        combat_arm: {
          code: "В00",
          id: 3,
          name: "Генеральный штаб ВС"
        },
        name_mu: {
          noscode: null,
          uslzcode: null,
          id: 3404,
          sname: "ГШ ВС РФ",
          name: "Генеральный штаб ВС РФ",
          kwcode: null,
          nspcode: null,
          colormarkcode: null
        },
        sort_forces: {
          code: "ГШВС",
          id: 13,
          sname: null,
          name: "В0Х"
        },
        document: {},
        position_mu: {
          id: 0,
          name: "Министерство",
          parent_id: null
        },
        nominal_number_name: "8496",
        common_number_name: null,
        id: 11000000,
        name: "Генеральный штаб ВС РФ",
        complicated_name: "ГШ ВС РФ, в/ч 8496",
        combat_readiness: null
      },
      uuid: "d5e007ee-43b2-41e9-9dac-619c79f7a9ef",
      shdk: {
        appointment: {
          uuid: "ccdd189c-1a8a-4817-8ef6-25ca2feaaa7d",
          name: "Офицер-оператор мониторинга повседневной деятельности",
          VUS: "187239"
        },
        military_man: {
          contacts: [
            {
              contact_type: {
                uuid: "b85930f6-92be-41fb-b770-0bdb7f4f8f0e",
                name: "Стационарный телефон"
              },
              contact: "16100-2148"
            }
          ],
          division: null,
          middle_name: "Петрович",
          surname: "Варварин",
          rank: {
            category: {
              alias: "Офицеры",
              uuid: "b69746fc-c0fb-4c1c-b71b-e37aec54e1da",
              name: "officers"
            },
            uuid: "eddbeb46-5d18-4662-b0c3-e0a9f5ca3aa4",
            name: "Старший лейтенант"
          },
          uuid: "038fa283-2e95-4a3b-b53a-d83ca9387587",
          name: "Виталий",
          appointment: {
            uuid: "ccdd189c-1a8a-4817-8ef6-25ca2feaaa7d",
            name: "Офицер-оператор мониторинга повседневной деятельности",
            VUS: "187239"
          }
        },
        rank: {
          category: {
            alias: "Офицеры",
            uuid: "b69746fc-c0fb-4c1c-b71b-e37aec54e1da",
            name: "officers"
          },
          uuid: "eddbeb46-5d18-4662-b0c3-e0a9f5ca3aa4",
          name: "Старший лейтенант"
        },
        group: {
          code: "8.1.6",
          uuid: "651c67e4-b8a7-4d23-a5ba-c821de55d53e",
          name: "Формирование информации о текущем состоянии АСУ, систем связи ПУ и их готовность к обеспечению управления войсками"
        },
        uuid: "ed3ccca8-ec4f-4b8f-8528-41b2c3aa8f08",
        status: {
          date: "2021-08-09",
          uuid: "40c4284f-2da5-432d-b84e-345de98f5e96",
          name: "available",
          note: ""
        }
      },
      military_man: null
    },
    decisions: [
      {
        decision: "Решение 22",
        documents: [],
        date: "2021-10-20T10:02:49",
        uuid: "c34797b1-1ee5-4b1c-bdc1-db8746581b75",
        name: "Решение 2",
        progress: "Решение 222",
        status: {
          uuid: "174ef091-3ca4-488f-94d7-8df2998cbf21",
          name: "Исполнение решения"
        }
      },
      {
        decision: "Решение 11",
        documents: [],
        date: "2021-10-20T10:01:49",
        uuid: "d70c4a5d-9f4e-4f46-a03e-25f3166c98e1",
        name: "Решение 1",
        progress: "Решение 111",
        status: {
          uuid: "174ef091-3ca4-488f-94d7-8df2998cbf21",
          name: "Новый"
        }
      }
    ],
    term_of_execution: "2021-10-22 00:00:00",
    uuid: "5c9db4be-a982-411b-90b4-bb40fa346214",
    additional_documents: [],
    date_of_receipt: "2030-10-20T00:00:00",
    document: {
      user: {
        id: "d0f31b9d-b0db-4138-895c-4b40ef38ba28",
        username: "shtkvdv01",
        full_name: "Романов Максим Максимович"
      },
      files: [],
      number: "25",
      military_unit: "Служба по надзору за оборотом оружия в ВС РФ",
      uuid: "4324a88c-4202-4cd6-b55e-af0596ccf5ec",
      type: {
        kind: {
          uuid: "4960cd7a-5922-4b9a-8259-ff080d219d87",
          name: "Приказ"
        },
        uuid: "04eb21b4-b3f9-4fc3-ac41-0f10257205c2"
      },
      created_at: "2021-04-21T00:00:00",
      summary: "Отмена в связи ремонтом техники",
      group: {
        code: "8.1.5",
        uuid: "1fa4a88c-4202-4cd6-b55e-af0596ccf5ec",
        name: "Мониторинг выполнения плана проверок БГ соединений и в/ч воздушно-десантных войск"
      },
      date: "2021-04-21T00:00:00",
      name: "Донесение отмены полетного задания",
      status: {
        code: "new",
        uuid: "dd25f3d5-ff50-4c66-ae49-e124826d613f",
        name: "Новый"
      }
    },
    report: {},
    customer: {
      uuid: "28a9508d-3b15-4028-9157-b0b7ca467c72",
      name: "Министерства обороны"
    },
    status: {
      uuid: "7fd8a6f2-a091-4301-b83c-0f150a2ce881",
      name: "Поручение не исполнено, срок исполнения не превышен",
      color: "blue"
    },
    coordinate: null,
    incoming_number: "121212",
    name: "О праздновании 9 Мая",
    military_unit: {
      pid: 9152,
      uuid: "e1afcb5e-cfba-11e5-9c4a-52540077a275",
      purpose_mu: {
        code: "330",
        id: 24,
        name: "Боевые соединения и части",
        parent_id: "21"
      },
      combat_arm: {
        code: "ГЖ3",
        id: 11,
        name: "Артиллерия"
      },
      name_mu: {
        noscode: null,
        uslzcode: null,
        id: 1790,
        sname: "ап",
        name: "Артиллерийский полк",
        kwcode: null,
        nspcode: null,
        colormarkcode: null
      },
      sort_forces: {
        code: "ВДВ",
        id: 5,
        sname: null,
        name: "Т0"
      },
      document: {},
      position_mu: {
        id: 5,
        name: "Полк",
        parent_id: 4
      },
      nominal_number_name: "33927",
      common_number_name: "1141",
      id: 9267,
      name: "Артиллерийский полк",
      complicated_name: "1141 ап, в/ч 33927",
      combat_readiness: null
    },
    action_logs: [],
    description: "Начать подготовку к параду"
  },
  {
    co_executors: [
      {
        military_unit: null,
        uuid: "95588220-7a8c-445c-84b5-c1f3b3ba62df",
        shdk: null,
        military_man: null
      }
    ],
    description_by_execution: null,
    executor: {
      military_unit: {
        pid: null,
        uuid: "00000000-0000-0000-0000-000000000000",
        purpose_mu: {
          code: "000",
          id: 1,
          name: "Вооруженные силы Российской Федерации",
          parent_id: null
        },
        combat_arm: {
          code: "А00",
          id: 2,
          name: "Министерство обороны"
        },
        name_mu: {
          noscode: null,
          uslzcode: null,
          id: 3403,
          sname: "МО РФ",
          name: "Министерство обороны РФ",
          kwcode: null,
          nspcode: null,
          colormarkcode: null
        },
        sort_forces: {
          code: "МО",
          id: 2,
          sname: null,
          name: "А0"
        },
        document: {},
        position_mu: {
          id: 0,
          name: "Министерство",
          parent_id: null
        },
        nominal_number_name: "9342",
        common_number_name: null,
        id: 10000000,
        name: "Министерство обороны РФ",
        complicated_name: "МО РФ, в/ч 9342",
        combat_readiness: null
      },
      uuid: "bac3d676-ac3a-472d-b9e3-bbbbdda8cd7f",
      shdk: {
        appointment: {
          uuid: "ccdd189c-1a8a-4817-8ef6-25ca2feaaa7d",
          name: "Офицер-оператор мониторинга повседневной деятельности",
          VUS: "187239"
        },
        military_man: {
          contacts: [
            {
              contact_type: {
                uuid: "b85930f6-92be-41fb-b770-0bdb7f4f8f0e",
                name: "Стационарный телефон"
              },
              contact: "16100-2148"
            }
          ],
          division: null,
          middle_name: "Петрович",
          surname: "Варварин",
          rank: {
            category: {
              alias: "Офицеры",
              uuid: "b69746fc-c0fb-4c1c-b71b-e37aec54e1da",
              name: "officers"
            },
            uuid: "eddbeb46-5d18-4662-b0c3-e0a9f5ca3aa4",
            name: "Старший лейтенант"
          },
          uuid: "038fa283-2e95-4a3b-b53a-d83ca9387587",
          name: "Виталий",
          appointment: {
            uuid: "ccdd189c-1a8a-4817-8ef6-25ca2feaaa7d",
            name: "Офицер-оператор мониторинга повседневной деятельности",
            VUS: "187239"
          }
        },
        rank: {
          category: {
            alias: "Офицеры",
            uuid: "b69746fc-c0fb-4c1c-b71b-e37aec54e1da",
            name: "officers"
          },
          uuid: "eddbeb46-5d18-4662-b0c3-e0a9f5ca3aa4",
          name: "Старший лейтенант"
        },
        group: {
          code: "8.1.6",
          uuid: "651c67e4-b8a7-4d23-a5ba-c821de55d53e",
          name: "Формирование информации о текущем состоянии АСУ, систем связи ПУ и их готовность к обеспечению управления войсками"
        },
        uuid: "ed3ccca8-ec4f-4b8f-8528-41b2c3aa8f08",
        status: {
          date: "2021-08-09",
          uuid: "40c4284f-2da5-432d-b84e-345de98f5e96",
          name: "available",
          note: ""
        }
      },
      military_man: null
    },
    decisions: [
      {
        decision: "цуцуцуц",
        documents: [
          {
            user: {
              id: "d0f31b9d-b0db-4138-895c-4b40ef38ba28",
              username: "shtkvdv01",
              full_name: "Романов Максим Максимович"
            },
            files: [
              {
                uri: "/api/pdf",
                filesize: 432,
                name: "DOK1",
                uuid: "1fa4a88c-4202-4cd6-b55e-af0596ccf5ec",
                type: "pdf",
                size: "0.4Кб",
                created_at: "2021-04-21T10:36:32"
              },
              {
                uri: "/api/pdf1",
                filesize: 432,
                name: "DOK1",
                uuid: "f226dc1e-5a15-47c5-b265-804350ad2508",
                type: "pdf",
                size: "0.4Кб",
                created_at: "2021-04-21T10:36:32"
              }
            ],
            number: "3",
            military_unit: "Служба по надзору за оборотом оружия в ВС РФ",
            uuid: "1fa4a88c-4202-4cd6-b55e-af0596ccf5ec",
            type: {
              kind: {
                uuid: "4960cd7a-5922-4b9a-8259-ff080d219d87",
                name: "Приказ"
              },
              uuid: "04eb21b4-b3f9-4fc3-ac41-0f10257205c2"
            },
            created_at: "2021-04-21T00:00:00",
            summary: "Документ",
            group: {
              code: "8.1.5",
              uuid: "1fa4a88c-4202-4cd6-b55e-af0596ccf5ec",
              name: "Мониторинг выполнения плана проверок БГ соединений и в/ч воздушно-десантных войск"
            },
            date: "2021-04-21T00:00:00",
            name: "Документ",
            status: {
              code: "new",
              uuid: "dd25f3d5-ff50-4c66-ae49-e124826d613f",
              name: "Новый"
            }
          }
        ],
        date: "2021-10-20T10:13:53",
        uuid: "b13ecaa4-a3c0-4596-8a4e-a4713ce4bbf8",
        name: "цуцуцуц",
        progress: "ццццу",
        status: {
          uuid: "174ef091-3ca4-488f-94d7-8df2998cbf21",
          name: "Исполнение решения"
        }
      },
      {
        decision: "мимими",
        documents: [
          {
            user: {
              id: "d0f31b9d-b0db-4138-895c-4b40ef38ba28",
              username: "shtkvdv01",
              full_name: "Романов Максим Максимович"
            },
            files: [],
            number: "25",
            military_unit: "Служба по надзору за оборотом оружия в ВС РФ",
            uuid: "4324a88c-4202-4cd6-b55e-af0596ccf5ec",
            type: {
              kind: {
                uuid: "4960cd7a-5922-4b9a-8259-ff080d219d87",
                name: "Приказ"
              },
              uuid: "04eb21b4-b3f9-4fc3-ac41-0f10257205c2"
            },
            created_at: "2021-04-21T00:00:00",
            summary: "Отмена в связи ремонтом техники",
            group: {
              code: "8.1.5",
              uuid: "1fa4a88c-4202-4cd6-b55e-af0596ccf5ec",
              name: "Мониторинг выполнения плана проверок БГ соединений и в/ч воздушно-десантных войск"
            },
            date: "2021-04-21T00:00:00",
            name: "Донесение отмены полетного задания",
            status: {
              code: "new",
              uuid: "dd25f3d5-ff50-4c66-ae49-e124826d613f",
              name: "Новый"
            }
          }
        ],
        date: "2021-10-20T10:14:22",
        uuid: "10085aab-5c93-402f-bbee-3e371433c23c",
        name: "имимими",
        progress: "иммим",
        status: {
          uuid: "174ef091-3ca4-488f-94d7-8df2998cbf21",
          name: "Новый"
        }
      },
      {
        decision: "нененен",
        documents: [],
        date: "2021-10-20T10:14:47",
        uuid: "ca6ea8a2-7d71-49db-931a-49eba7045147",
        name: "ененене",
        progress: "енененен",
        status: {
          uuid: "174ef091-3ca4-488f-94d7-8df2998cbf21",
          name: "Новый"
        }
      }
    ],
    term_of_execution: "2021-10-29 00:00:00",
    uuid: "bdf64771-13d9-4b4c-8f85-ccac2554d247",
    additional_documents: [],
    date_of_receipt: "2030-10-20T00:00:00",
    document: {
      user: {
        id: "d0f31b9d-b0db-4138-895c-4b40ef38ba28",
        username: "shtkvdv01",
        full_name: "Романов Максим Максимович"
      },
      files: [],
      number: "15",
      military_unit: "Служба по надзору за оборотом оружия в ВС РФ",
      uuid: "22a4a88c-4202-4cd6-b55e-af0596ccf5ec",
      type: {
        kind: {
          uuid: "4960cd7a-5922-4b9a-8259-ff080d219d87",
          name: "Приказ"
        },
        uuid: "04eb21b4-b3f9-4fc3-ac41-0f10257205c2"
      },
      created_at: "2021-03-21T00:00:00",
      summary: "Обучение вновь прибывшего пополнение",
      group: {
        code: "8.1.5",
        uuid: "1fa4a88c-4202-4cd6-b55e-af0596ccf5ec",
        name: "Мониторинг выполнения плана проверок БГ соединений и в/ч воздушно-десантных войск"
      },
      date: "2022-01-25T00:00:00",
      name: "Приказ на полетное задание",
      status: {
        code: "new",
        uuid: "dd25f3d5-ff50-4c66-ae49-e124826d613f",
        name: "Новый"
      }
    },
    report: {},
    customer: {
      uuid: "0af50c3e-986c-4c33-9294-e8bcb3c09f54",
      name: "Начальника генерального штаба"
    },
    status: {
      uuid: "7fd8a6f2-a091-4301-b83c-0f150a2ce881",
      name: "Поручение не исполнено, срок исполнения не превышен",
      color: "blue"
    },
    coordinate: null,
    incoming_number: "3333",
    name: "Подготовка к учениям Армия 2021",
    military_unit: {
      pid: 9152,
      uuid: "e1afcb5e-cfba-11e5-9c4a-52540077a275",
      purpose_mu: {
        code: "330",
        id: 24,
        name: "Боевые соединения и части",
        parent_id: "21"
      },
      combat_arm: {
        code: "ГЖ3",
        id: 11,
        name: "Артиллерия"
      },
      name_mu: {
        noscode: null,
        uslzcode: null,
        id: 1790,
        sname: "ап",
        name: "Артиллерийский полк",
        kwcode: null,
        nspcode: null,
        colormarkcode: null
      },
      sort_forces: {
        code: "ВДВ",
        id: 5,
        sname: null,
        name: "Т0"
      },
      document: {},
      position_mu: {
        id: 5,
        name: "Полк",
        parent_id: 4
      },
      nominal_number_name: "33927",
      common_number_name: "1141",
      id: 9267,
      name: "Артиллерийский полк",
      complicated_name: "1141 ап, в/ч 33927",
      combat_readiness: null
    },
    action_logs: [],
    description: "Поставить в известность о сроках проведения учений все участвующие подразделения"
  }
]

export const MOCK_MILITARY_UNITS_FLAT = [
  {
    children: [],
    access_level: {
      name: "Батальон (дивизион)",
      id: 6
    },
    label: "Отдельный ремонтно-восстановительный батальон",
    id: 10045243
  },
  {
    children: [],
    access_level: {
      name: "Взвод",
      id: 8
    },
    label: "Комендантский взвод",
    id: 15074
  },
  {
    children: [],
    access_level: {
      name: "Батальон (дивизион)",
      id: 6
    },
    label: "Отдельный ремонтно-восстановительный батальон",
    id: 10045243
  },
  {
    children: [],
    access_level: {
      name: "Взвод",
      id: 8
    },
    label: "Комендантский взвод",
    id: 15074
  },
  {
    children: [],
    access_level: {
      name: "Батальон (дивизион)",
      id: 6
    },
    label: "Отдельный ремонтно-восстановительный батальон",
    id: 10045243
  },
  {
    children: [],
    access_level: {
      name: "Взвод",
      id: 8
    },
    label: "Комендантский взвод",
    id: 15074
  },
]

export const MOCK_MILITARY_UNITS = [
    {
      children: [
        {
          children: [],
          access_level: {
            name: "Батальон (дивизион)",
            id: 6
          },
          label: "Отдельный ремонтно-восстановительный батальон",
          id: 10045243
        },
        {
          children: [
            {
              children: [],
              access_level: {
                name: "Батальон (дивизион)",
                id: 6
              },
              label: "Отдельный ремонтно-восстановительный батальон",
              id: 10045243
            },
            {
              children: [],
              access_level: {
                name: "Взвод",
                id: 8
              },
              label: "Комендантский взвод",
              id: 15074
            },
          ],
          access_level: {
            name: "Взвод",
            id: 8
          },
          label: "Комендантский взвод",
          id: 15074
        },
      ],
      access_level: {
        name: "Батальон (дивизион)",
        id: 6
      },
      label: "Отдельный ремонтно-восстановительный батальон",
      id: 10045243
    },
    {
      children: [
        {
          children: [],
          access_level: {
            name: "Батальон (дивизион)",
            id: 6
          },
          label: "Отдельный ремонтно-восстановительный батальон",
          id: 10045243
        },
        {
          children: [
            {
              children: [],
              access_level: {
                name: "Батальон (дивизион)",
                id: 6
              },
              label: "Отдельный ремонтно-восстановительный батальон",
              id: 10045243
            },
            {
              children: [],
              access_level: {
                name: "Взвод",
                id: 8
              },
              label: "Комендантский взвод",
              id: 15074
            },
          ],
          access_level: {
            name: "Взвод",
            id: 8
          },
          label: "Комендантский взвод",
          id: 15074
        },
      ],
      access_level: {
        name: "Взвод",
        id: 8
      },
      label: "Комендантский взвод",
      id: 15074
    },
    {
      children: [
        {
          children: [
            {
              children: [],
              access_level: {
                name: "Батальон (дивизион)",
                id: 6
              },
              label: "Отдельный ремонтно-восстановительный батальон",
              id: 10045243
            },
            {
              children: [],
              access_level: {
                name: "Взвод",
                id: 8
              },
              label: "Комендантский взвод",
              id: 15074
            },
          ],
          access_level: {
            name: "Батальон (дивизион)",
            id: 6
          },
          label: "Отдельный ремонтно-восстановительный батальон",
          id: 10045243
        },
        {
          children: [],
          access_level: {
            name: "Взвод",
            id: 8
          },
          label: "Комендантский взвод",
          id: 15074
        },
      ],
      access_level: {
        name: "Батальон (дивизион)",
        id: 6
      },
      label: "Отдельный ремонтно-восстановительный батальон",
      id: 10045243
    },
    {
      children: [
        {
          children: [
            {
              children: [],
              access_level: {
                name: "Батальон (дивизион)",
                id: 6
              },
              label: "Отдельный ремонтно-восстановительный батальон",
              id: 10045243
            },
            {
              children: [],
              access_level: {
                name: "Взвод",
                id: 8
              },
              label: "Комендантский взвод",
              id: 15074
            },
          ],
          access_level: {
            name: "Батальон (дивизион)",
            id: 6
          },
          label: "Отдельный ремонтно-восстановительный батальон",
          id: 10045243
        },
        {
          children: [],
          access_level: {
            name: "Взвод",
            id: 8
          },
          label: "Комендантский взвод",
          id: 15074
        },
      ],
      access_level: {
        name: "Взвод",
        id: 8
      },
      label: "Комендантский взвод",
      id: 15074
    },
    {
      children: [
        {
          children: [],
          access_level: {
            name: "Батальон (дивизион)",
            id: 6
          },
          label: "Отдельный ремонтно-восстановительный батальон",
          id: 10045243
        },
        {
          children: [
            {
              children: [],
              access_level: {
                name: "Батальон (дивизион)",
                id: 6
              },
              label: "Отдельный ремонтно-восстановительный батальон",
              id: 10045243
            },
            {
              children: [],
              access_level: {
                name: "Взвод",
                id: 8
              },
              label: "Комендантский взвод",
              id: 15074
            },
          ],
          access_level: {
            name: "Взвод",
            id: 8
          },
          label: "Комендантский взвод",
          id: 15074
        },
      ],
      access_level: {
        name: "Батальон (дивизион)",
        id: 6
      },
      label: "Отдельный ремонтно-восстановительный батальон",
      id: 10045243
    },
    {
      children: [
        {
          children: [
            {
              children: [],
              access_level: {
                name: "Батальон (дивизион)",
                id: 6
              },
              label: "Отдельный ремонтно-восстановительный батальон",
              id: 10045243
            },
            {
              children: [],
              access_level: {
                name: "Взвод",
                id: 8
              },
              label: "Комендантский взвод",
              id: 15074
            },
          ],
          access_level: {
            name: "Батальон (дивизион)",
            id: 6
          },
          label: "Отдельный ремонтно-восстановительный батальон",
          id: 10045243
        },
        {
          children: [],
          access_level: {
            name: "Взвод",
            id: 8
          },
          label: "Комендантский взвод",
          id: 15074
        },
      ],
      access_level: {
        name: "Взвод",
        id: 8
      },
      label: "Комендантский взвод",
      id: 15074
    },
]
