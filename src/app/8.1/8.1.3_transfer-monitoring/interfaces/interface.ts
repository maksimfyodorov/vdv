export interface TimerDate {
    month: number,
    day: number,
    hour: number,
    minute: number,
}

export interface TransferPlan {
    uuid: string,
    name: string,
    plan_status: string,
}

export interface TransferType {
    uuid: string,
    name: string,
    index: number[],
}

export interface TableColumns {
    field: string,
    header: string,
}

export interface PlanHistory {
    action: string,
    date: string,
    status: string,
    user: string,
}