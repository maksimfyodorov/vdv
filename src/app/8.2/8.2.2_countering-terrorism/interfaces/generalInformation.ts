export interface GeneralInformation {
    uuid?: string,
    number: number,
    map: string,
    date: string,
    publication: string,
    control_point_uuid?: string,
    summary_uuid?: string,
    control_point?: ControlPoint,
}

export interface ControlPoint {
    name: string,
    uuid: string,
}
export interface Position {
    appointment: string,
    responsible: string,
    phoneNumber: string,
}

export interface StateOfPower {
    cityName: string,
    cityCount: number,
    objectCategory: string,
    coordinates: any
}

export interface Garrison {
    name?: string,
    personnel: any,
    vat: any,
    vbt: any,
    workingHours: string,
    nonWorkingHours: string
}

export interface NewBillData {
    inputNumber: number,
    inputDate: Date,
}

