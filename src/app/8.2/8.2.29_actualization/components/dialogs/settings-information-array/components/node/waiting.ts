export interface Waiting {
    path: string,
    is_dir: boolean,
    children: Waiting[],
    parent?: any
    waiting_status?: WaitingStatus 
}

export interface WaitingStatus {
    uuid: string,
    name: string
}