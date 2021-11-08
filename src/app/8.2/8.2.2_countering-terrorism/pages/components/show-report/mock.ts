import { GeneralInformation } from "../../../interfaces/generalInformation"
import { ReportResults } from "../../../interfaces/interface"

export const composition = {
    strengthGarrisonArray: [
        {
            name: 'Госпиталь',
            soldiers: 100,
            work_time: '01:00',
            not_work_time: '09:00',
            autoTransport: 100,
            armoredTransport: 100
        },
        {
            name: 'Столовая',
            soldiers: 100,
            work_time: '01:00',
            not_work_time: '09:00',
            autoTransport: 100,
            armoredTransport: 100
        }
    ],
    strengthGarrison: {
        soldiers: 100,
        work_time: '01:00',
        not_work_time: '09:00',
        autoTransport: 100,
        armoredTransport: 100
    },
    antiterrorGarrison: {
        soldiers: 100,
        work_time: '01:00',
        not_work_time: '09:00',
        autoTransport: 100,
        armoredTransport: 100
    },
    reserve: {
        soldiers: 100,
        work_time: '01:00',
        not_work_time: '09:00',
        autoTransport: 100,
        armoredTransport: 100
    },
    mobileReserve: {
        soldiers: 100,
        work_time: '01:00',
        not_work_time: '09:00',
        autoTransport: 100,
        armoredTransport: 100
    },
    functionGroup: {
        soldiers: 100,
        work_time: '01:00',
        not_work_time: '09:00',
        autoTransport: 100,
        armoredTransport: 100
    },
    liquidationDivision: {
        soldiers: 100,
        work_time: '01:00',
        not_work_time: '09:00',
        autoTransport: 100,
        armoredTransport: 100
    },
    cityName: 'NePonyal',
    mode: {
        soldiers: 100,
        secondSoldiers: 100,
        work_time: '01:00',
        not_work_time: '09:00',
    },
    managment: [
        {
            number: 1,
            position: 'sfasfasfasfa',
            responsible: 'gaevgafawfaw',
            phone: '535670604643'
        },
        {
            number: 2,
            position: 'krstzjt',
            responsible: '35fzafaqagfaad',
            phone: '78789770604643'
        },
    ]
}

export const generalInformation: GeneralInformation = {
    number: 12321,
    map: 'gaefae',
    date: '21.01.2020',
    publication: '25.05.2020',
    summary_uuid: 'dawafwafawf',
    control_point: {
        name: 'tochka',
        uuid: 'awfaf2125f1251vfq',
    },
}

export const situation = {
    districts: [
        { name: 'dggfasfasfas' },
        { name: 'hdtfsdvfesfae' },
    ],
    terroristThreats: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores temporibus sint vero sunt autem harum blanditiis fuga eligendi repellendus cupiditate, accusamus delectus alias! Beatae animi architecto a fugit commodi odi",
    criticalObjects: [
        {
            name: 'gagawgfawfawfaw',
            coordinates: 'gafwhfawfw',
        },
        {
            name: 'gagawgfawfawfaw',
            coordinates: 'gafwhfawfw',
        },
        {
            name: 'gagawgfawfawfaw',
            coordinates: 'gafwhfawfw',
        },
    ],
    criminal: 'afjwh;fwawmn.klwamklfwamklfmklfamklfawmklamkfamkfamkfwmklfawmklfawmklfamklfwamklrt3qfqaejicdmkqokjicvdkqmklaekirqm,fkiczkq2r2jqimcqpjc4cmuq2rcpm2pqrmuq2muqpourymcq2rpyqmc2yqporcmyq2ymrcy',
}

// export const situation = {
//     districts: null,
//     terroristThreats: null,
//     criticalObjects: null,
//     criminal: null,
// }


export const preparationAntiterror = {
    monthlyDemonstrationWorkouts: 'Сотрудники ОМОН и СОБР Управления Росгвардии по Костромской области приняли участие в совместном тактико-специальном занятии по нейтрализации условного противника в населённом пункте и в лесистой местности. Росгвардейцы отработали действия по освобождению заложников и нейтрализовали условное незаконное вооружённое формирование.',
    commandPostExercise: 'В ходе учения выполнены мероприятия по отработке межведомственного взаимодействия при пресечении преступлений террористической направленности на территории Ледового дворца в Мурманске. В учениях приняли участие подразделения региональных управлений ФСБ,Росгвардии, МВД, МЧС, СК, а также представители Правительства Мурманской области и администрации г. Мурманска.',
    teachingsComander: 'Оперативным штабом в Республике Калмыкия во взаимодействии с органами управления, создаваемой группировкой сил и средств, проведено тактико-специальное учение по пресечению диверсионно-террористического акта на объекте с массовым пребыванием людей «Экран-МУП «Октябрь» - Захват».',
    teachingsNak: 'Хочешь победить врага, научись думать, как он. Эту незыблемую истину, проверенную веками, бойцы спецподразделения Пограничного управления ФСБ России по восточному арктическому району усвоили как «Отче наш». Любая тренировка, не говоря о масштабных учениях, начинается с тщательной проработки действий условного противника.',
}

// export const preparationAntiterror = {
//     monthlyDemonstrationWorkouts: '',
//     commandPostExercise: '',
//     teachingsComander: '',
//     teachingsNak: '',
// }


export const annualPlan = {
    name: 'Приказ',
    documents: [
        'document.doc', 'file.txt'
    ],
    events: [
        {
            number: 1,
            point: '7.1.1',
            event: 'event!@#%@!',
            status: 'Выполненно'
        },
        {
            number: 1,
            point: '1.5.5',
            event: 'event!@#%@!',
            status: 'Выполняется'
        },
        {
            number: 3,
            point: '1.2.3',
            event: 'event!@#%@!',
            status: 'Не выполнено'
        },
    ]
}

// export const annualPlan = {
//     name: null,
//     documents: null,
//     events: null,
// }

export const teaching = {
    internationalExercises: 'faeonjifawojifawdfawkjdawkljdawkljidawkljdawljdaw',
    participationStaff: 'awfawofh12oi1fj2oidokd212dfk1wdjaiaw',
    developmentParticipation: 'fajipafpji2jio12nckmldawojidwakawdojiadwklaw',
    problematicIssues: 'fwafwijafwjdawijioawfklcawaj'
}

export const reportResults: ReportResults = {
    militaryCity: 10,
    modeB: 90,
    modeAV: 110,
    ls: 150,
    vvAT: 11,
    vvBT: 4,
    composition: composition,
}

export const protectionSecurity = {
    informationSources: 'wfkjfwfawfawfawfawfawhluawfhuihuifhufahfauwwfawwafawhui2rqphjufqanaf2a2fa2fa',
    securityWork: 'wfkjfwfawfawfawfawfawhluawfhuihuifhufahfauwwfawwafawhui2rqphjufqanaf2a2fa2fa',
    dataLimits: 'wfkjfwfawfawfawfawfawhluawfhuihuifhufahfauwwfawwafawhui2rqphjufqanaf2a2fa2fa',
}

export const verification = {
    commandCheck: 'nlfjuidawjuid289j2d89j12dnnui21dn21dnui2d2dnini2dnjipnjui21pnui21dpmnui21d21dm21dm21dd',
    militaryControlCheck: 'awffawafawawawgaty4q31awf21faf2awf2a2af',
    zoneMasterCheck: 'mkfae;kfawo;jifawojifwajfawnufawfawnfaw;nufawfaw',
    checkingLocalGarrisons: 'agfwnjfwalfawnlufawnlfawnfawonifawomnifawomifawomi',
}